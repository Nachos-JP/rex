"use strict";

import {app, protocol, BrowserWindow, ipcMain} from "electron";
import {createProtocol} from "vue-cli-plugin-electron-builder/lib";
import Store from "electron-store";
import WebSocket from "ws";

const isDevelopment = process.env.NODE_ENV !== "production";
let win;
const store = new Store();

protocol.registerSchemesAsPrivileged([
  {scheme: "app", privileges: {secure: true, standard: true}},
]);

const createWindow = () => {
  win = new BrowserWindow({
    width: store.get("window.bound.width", 800),
    height: store.get("window.bound.height", 600),
    x: store.get("window.bound.x", null),
    y: store.get("window.bound.y", null),
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    win.loadURL("app://./index.html");
  }

  win.on("close", () => {
    const bound = win.getBounds();
    store.set("window.bound", {
      width: bound.width,
      height: bound.height,
      x: bound.x,
      y: bound.y,
    });
  });

  win.on("closed", () => {
    win = null;
  });
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

app.on("ready", async () => {
  createWindow();
});

ipcMain.on("run-optimize", (event, arg) => {
  const ws = new WebSocket("ws://localhost:8989");

  ws.onopen = () => {
    console.log("connection opened");
    ws.send(JSON.stringify(arg));
  };

  ws.onmessage = message => {
    console.log(message.data);
  };

  ws.onerror = () => {
    console.log("connection error");
  };
});

ipcMain.handle("check-url", (event, arg) => {
  let ws;
  try {
    ws = new WebSocket(`ws://${arg}`);
  } catch (e){
    return false;
  }

  return new Promise(resolve=>{
    ws.onopen = () => {
      ws.close();
      resolve(true);
    };
    ws.onerror = () => resolve(false);
  });
});

if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

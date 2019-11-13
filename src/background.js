"use strict";

import {app, protocol, BrowserWindow} from "electron";
import {createProtocol} from "vue-cli-plugin-electron-builder/lib";
import WebSocket from "ws";
import Store from "electron-store";

const isDevelopment = process.env.NODE_ENV !== "production";
let win;
const store = new Store();

protocol.registerSchemesAsPrivileged([
  {scheme: "app", privileges: {secure: true, standard: true}},
]);

const sleep = sec => {
  return new Promise(resolve=>setTimeout(resolve, sec*1e3));
};

function createWindow() {
  win = new BrowserWindow({
    width: store.get("window.bound.width", 800),
    height: store.get("window.bound.height", 600),
    x: store.get("window.bound.x", null),
    y: store.get("window.bound.y", null),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    win.loadURL("app://./index.html");
  }

  const ws = new WebSocket("ws://localhost:8989");

  ws.onopen = async () => {
    console.log("connection opened");
    for (let i=0; i<5; i++){
      ws.send("Hello");
      await sleep(1);
    }
  };

  ws.onmessage = message => {
    console.log(message.data);
  };

  ws.onerror = () => {
    console.log("connection error");
  };

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
    ws.close();
  });
}

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

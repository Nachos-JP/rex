"use strict";

import {app, protocol, BrowserWindow} from "electron";
import {createProtocol} from "vue-cli-plugin-electron-builder/lib";
import WebSocket from "ws";
import Store from "electron-store";

const isDevelopment = process.env.NODE_ENV !== "production";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const store = new Store();

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {scheme: "app", privileges: {secure: true, standard: true}},
]);

const sleep = sec => {
  return new Promise(resolve=>setTimeout(resolve, sec*1e3));
};

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: store.get("window.bound.width", 800),
    height: store.get("window.bound.height", 600),
    x: store.get("window.bound.x", null),
    y: store.get("window.bound.y", null),
    webPreferences: {
      nodeIntegration: true,
    }});

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
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

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
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

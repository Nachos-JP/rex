"use strict";

import {app, protocol, BrowserWindow} from "electron";
import {createProtocol} from "vue-cli-plugin-electron-builder/lib";
import Store from "electron-store";
import Pso from "pso";

const isDevelopment = process.env.NODE_ENV !== "production";
let win;
const store = new Store();

protocol.registerSchemesAsPrivileged([
  {scheme: "app", privileges: {secure: true, standard: true}},
]);

const sleep = sec => {
  return new Promise(resolve=>setTimeout(resolve, sec*1e3));
};

const benchMark = async (x, done) => {
  const a = Math.cos(x[0]);
  const b = Math.cos(x[1]);
  const c = Math.exp(-((x[0]-Math.PI)**2 + (x[1]-Math.PI)**2));
  await sleep(0.01);
  done(a * b * c);
};

const optimize = async () => {
  const pso = new Pso();
  pso.setObjectiveFunction(benchMark, {async: true});

  pso.init(20, [{start: -100, end: 100}, {start: -100, end: 100}]);

  let count = 0;
  const maxIteration = 100;

  const loop = () => {
    if (count >= maxIteration){
      console.log("best fitness", pso.getBestFitness());
      console.log("best position", pso.getBestPosition());
    } else {
      count ++;
      console.log(`iteration: ${count}`);
      pso.step(loop);
    }
  };

  loop();
};

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

  optimize();
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

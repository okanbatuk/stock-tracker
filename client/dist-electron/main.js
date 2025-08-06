import { app, BrowserWindow } from "electron";
import * as remoteMain from "@electron/remote/main/index.js";
remoteMain.initialize();
let win;
const createWindow = () => {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
        },
        maximizable: true,
    });
    remoteMain.enable(win.webContents);
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
};
app.whenReady().then(createWindow);
app.on("before-quit", async () => {
    const win = BrowserWindow.getAllWindows()[0];
    if (win) {
        // renderer sürecinden localStorage’ı temizle
        win.webContents.executeJavaScript("localStorage.clear();");
    }
});
/* SIGINT’i yakalayıp graceful shutdown yap */
process.on("SIGINT", () => {
    if (win && !win.isDestroyed()) {
        win.webContents.executeJavaScript("localStorage.clear();").finally(() => {
            app.quit();
        });
    }
    else {
        app.quit();
    }
});

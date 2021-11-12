const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, Tray } = electron;

let mainWindow;

app.on('ready', () => {
    // main window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        height: 500,
        width: 300,
        frame: false,
        resizable: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
    // tray icon
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    new Tray(iconPath);
});

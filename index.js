const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer_tray');

const { app, BrowserWindow } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    app.dock.hide();
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
    mainWindow.on('blur', () => mainWindow.hide());

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const icon = path.join(__dirname, `./src/assets/${iconName}`);
    // Assign this variable to prevent the timerTray from being deleted by the garbage collector
    tray = new TimerTray(icon, mainWindow);

});

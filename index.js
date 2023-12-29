const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');

const { app } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    app.dock.hide();
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const icon = path.join(__dirname, `./src/assets/${iconName}`);
    mainWindow = new MainWindow();
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
    mainWindow.on('blur', () => mainWindow.hide());
    tray = new TimerTray(icon, mainWindow);
});

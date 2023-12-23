const path = require('path');
const electron = require('electron');

const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
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

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const icon = path.join(__dirname, `./src/assets/${iconName}`);
    tray = new Tray(icon);
    tray.on('click', (event, bounds) => {
        const { x, y } = bounds;
        const { height, width } = mainWindow.getBounds();
        // fix for windows tray
        const yPosition = process.platform === 'darwin' ? y : y - height;
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
            mainWindow.setBounds({
                x: x - width / 2,
                y: yPosition,
                height,
                width
            });
        }
    });
});

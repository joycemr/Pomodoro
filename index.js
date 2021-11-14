const electron = require('electron');
const path = require('path');
const { cli } = require('webpack');

const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

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
        resizable: false,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    // tray icon
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tray = new Tray(iconPath);

    // show icon on icon click
    tray.on('click', (event, bounds) => {
        // get bounds of click event
        const { x, y } = bounds;

        // get bounds of the window
        const { height, width } = mainWindow.getBounds();

        // reset y if on windows
        const yPosition = process.platform === 'darwin' ? y : y - height;

        if (mainWindow.isVisible()) {
            mainWindow.hide();
        }
        else {
            mainWindow.setBounds({
                x: x - width / 2,
                y: yPosition,
                height: height,
                width: width
            });
            mainWindow.show();
        }
    });

});

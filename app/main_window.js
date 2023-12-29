const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
    constructor() {
        super({
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
    }
}

module.exports = MainWindow;

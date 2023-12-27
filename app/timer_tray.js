const electron = require('electron');
const { Tray } = electron;

class TimerTray extends Tray {

    constructor(iconPath, mainWindow) {
        super(iconPath);
        this.mainWindow = mainWindow;
        this.on('click', this.onClick.bind(this));
    }

    onClick = (event, bounds) => {
        const { x, y } = bounds;
        const { height, width } = this.mainWindow.getBounds();
        // fix for windows tray
        const yPosition = process.platform === 'darwin' ? y : y - height;
        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            this.mainWindow.show();
            this.mainWindow.setBounds({
                x: x - width / 2,
                y: yPosition,
                height,
                width
            });
        }
    }

};

module.exports = TimerTray;

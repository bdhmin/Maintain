const {app, BrowserWindow} = require('electron')
    const url = require("url");
    const path = require("path");

    // require('electron-reload')(__dirname, {
    //     electron: require(`${__dirname}/node_modules/electron`)
    // });

    let mainWindow

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 450,
        height: 800,
        // titleBarStyle: "hiddenInset",
        trafficLightPosition: { x: 16, y: 16 },
        titleBarOverlay: {
          height: 60
        },
        webPreferences: {
          nodeIntegration: true
        }
      })

      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/Maintain/index.html`),
          protocol: "file:",
          slashes: true
        })
      );
      // Open the DevTools.
      mainWindow.webContents.openDevTools()

      mainWindow.on('closed', function () {
        mainWindow = null
      })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })
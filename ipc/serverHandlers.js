const {ipcMain} = require('electron')
const {startSocket,stopSocket} = require('../network/socket')

function registerServerHandlers(win){
    ipcMain.on('start-server', () => {
      let serverHost = startSocket(win);
      win.webContents.send('server-ip', serverHost)
    });
    
    // Stop server
    ipcMain.on('stop-server', () => {
      stopSocket();
    });
}

module.exports = registerServerHandlers;
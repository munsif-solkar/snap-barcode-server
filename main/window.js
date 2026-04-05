const { BrowserWindow,Menu } = require('electron');
const path = require('path');

function createMainWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 450,
    
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, '../preload/preload.js')
    }
  });

  Menu.setApplicationMenu(null)

  win.loadFile('../ui/index.html');
  return win
}

module.exports = { createMainWindow }
// main/app-lifecycle.js
const { app, BrowserWindow } = require('electron');

function setupAppLifecycle(win) {
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      win = createMainWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}

module.exports = { setupAppLifecycle };
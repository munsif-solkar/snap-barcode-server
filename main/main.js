const { app } = require('electron');
const path = require('path');
const registerServerHandlers = require('../ipc/serverHandlers')
const { createMainWindow } = require('./window');
const { setupAppLifecycle } = require('./app-lifecycle');

let win;


// App ready
app.whenReady().then(() => {
  win = createMainWindow();
  registerServerHandlers(win)
  setupAppLifecycle(win)
 
});




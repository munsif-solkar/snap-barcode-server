const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  startServer: () => ipcRenderer.send('start-server'),
  stopServer: () => ipcRenderer.send('stop-server'),
  onCodeReceived: (callback) => ipcRenderer.on('code-received', callback),
  getServerIp: (callback) => ipcRenderer.on('server-ip',callback),
  clientStatus: (callback) => ipcRenderer.on('client-status',callback),
  sendAutomationSettings: (data) => ipcRenderer.send('update-automation-settings',data)
});
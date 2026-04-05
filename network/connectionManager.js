const {clipboard} = require('electron')
const {handleScan} = require('../core/scanner/handleScan')


async function sendToWindow(win, code){
  if (win && win.webContents) {
    win.webContents.send('code-received', code);
  }

  try {
    clipboard.writeText(String(code));
    await handleScan(code)
  } catch (err) {
    console.error("Failed: ", err);
  }
};

function sendClientStatus(win,msg){
  win.webContents.send('client-status',msg)
}

module.exports = {sendToWindow,sendClientStatus}
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const serveripDisplay = document.getElementById('server-host')
const deviceConnectionStatus = document.getElementById('device-connection-status')


function dispatchNewCodeToWindow(code){
  window.dispatchEvent(new CustomEvent("new-code", { detail: code }));
}

startBtn.addEventListener('click', () => {
  window.electronAPI.startServer();

});

stopBtn.addEventListener('click', () => {
  window.electronAPI.stopServer();
});

window.electronAPI.onCodeReceived((event, qrCode) => {
  dispatchNewCodeToWindow(qrCode)

});

window.electronAPI.getServerIp((event,ip)=>{
  serveripDisplay.innerHTML = ip;
})


  


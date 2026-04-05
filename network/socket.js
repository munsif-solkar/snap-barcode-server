const WebSocket = require('ws')
const {host,port} = require('./server_config')

const {sendClientStatus,sendToWindow} = require('./connectionManager')

let server = null;
let qrcode = null;


function startSocket(win) {
    if (server) return "Server already running";

    server = new WebSocket.Server({ port: port,host: host });

    server.on("connection", ws => {
        console.log("Phone connected")
        sendClientStatus(win,'connected')

        ws.on('close',ws=>{
            sendClientStatus(win,'disconnected')
        })
        ws.on("message", msg => {
            qrcode = msg.toString()
            console.log("QR:", qrcode)

            sendToWindow(win,qrcode)
        })
    })


    console.log("WebSocket started")
    return host

}

function stopSocket() {
    if (!server) return "not running"

    server.clients.forEach(ws => {
        ws.close(1000,"Closing server!");
    });
    server.close()
    server = null

    console.log("WebSocket stopped")
    return "stopped"
}

module.exports = {startSocket,stopSocket}

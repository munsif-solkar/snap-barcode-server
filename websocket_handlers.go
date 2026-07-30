package main

import (
	"fmt"
	"snap-barcode-server/websocket"

	"snap-barcode-server/message"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func (a *App) StartSocketServer() (string, error) {
	if url, err := websocket.StartWebSocket(); err != nil {
		fmt.Println(err)
		return "", err
	} else {

		fmt.Println("WebSocket started at:", url)
		websocket.Callbacks.OnClientConnected = func() {
			runtime.EventsEmit(a.ctx, "client-connected")
		}
		websocket.Callbacks.OnClientDisconnected = func() {
			runtime.EventsEmit(a.ctx, "client-disconnected")
		}
		message.Callbacks.OnMessageReceived = func(msg string) {
			runtime.EventsEmit(a.ctx, "message-received", msg)
		}
		return url, nil
	}
}

func (a *App) StopSocketServer() {
	if err := websocket.StopWebSocket(); err != nil {
		fmt.Println(err)
	}
}

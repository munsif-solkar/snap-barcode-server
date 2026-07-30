package websocket

import (
	"fmt"
	"net"
	"net/http"
	"snap-barcode-server/message"
	"sync"

	"github.com/gorilla/websocket"
)

type Events struct {
	OnClientConnected    func()
	OnClientDisconnected func()
}

var Callbacks Events

var (
	server *http.Server

	clients = make(map[*websocket.Conn]bool)
	mutex   sync.Mutex
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func StartWebSocket() (string, error) {
	localIP := WSConfig.Host
	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			return
		}

		mutex.Lock()
		clients[conn] = true
		mutex.Unlock()

		fmt.Println("Client connected")
		if Callbacks.OnClientConnected != nil {
			Callbacks.OnClientConnected()
		}

		defer func() {
			mutex.Lock()
			delete(clients, conn)
			mutex.Unlock()

			conn.Close()

			fmt.Println("Client removed")
			if Callbacks.OnClientDisconnected != nil {
				Callbacks.OnClientDisconnected()
			}
		}()

		for {

			_, msg, err := conn.ReadMessage()

			if err != nil {
				break
			}

			receivedMessage := string(msg)

			message.Event(receivedMessage)

		}
	})

	listener, err := net.Listen("tcp", WSConfig.Host+":"+WSConfig.Port)
	if err != nil {
		return "", err
	}

	server = &http.Server{
		Handler: mux,
	}

	go func() {

		err := server.Serve(listener)

		if err != nil && err != http.ErrServerClosed {
			server = nil
		}

	}()

	fmt.Println("WebSocket running")

	return localIP, nil
}

func StopWebSocket() error {

	// Close all clients
	mutex.Lock()

	for client := range clients {
		client.Close()
	}

	clients = make(map[*websocket.Conn]bool)

	mutex.Unlock()

	// Stop HTTP server
	if server != nil {
		fmt.Println("Stopping WebSocket")
		return server.Close()
	} else if server == nil {
		fmt.Println("WebSocket server is not running")
		return nil
	}

	fmt.Println("WebSocket stopped")
	return nil

}

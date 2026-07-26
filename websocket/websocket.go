package websocket

import (
	"fmt"
	"net/http"
	"sync"

	"snap-barcode-server/message"

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

	server = &http.Server{
		Addr:    WSConfig.Host + ":" + WSConfig.Port,
		Handler: mux,
	}

	go func() {

		fmt.Println("WebSocket running")

		err := server.ListenAndServe()

		if err != nil && err != http.ErrServerClosed {
			fmt.Println(err)
		}

	}()

	return localIP, nil
}

func StopWebSocket() error {

	fmt.Println("Stopping WebSocket")

	// Close all clients
	mutex.Lock()

	for client := range clients {
		client.Close()
	}

	clients = make(map[*websocket.Conn]bool)

	mutex.Unlock()

	// Stop HTTP server
	if server != nil {
		return server.Close()
	}

	fmt.Println("WebSocket stopped")
	return nil

}

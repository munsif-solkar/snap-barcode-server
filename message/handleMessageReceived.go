package message

import "snap-barcode-server/automation"

type Events struct {
	OnMessageReceived func(msg string)
}

var Callbacks Events

func Event(msg string) {
	println("Received message:", msg)
	Callbacks.OnMessageReceived(msg)
	automation.ExecuteAutomation(msg)
}

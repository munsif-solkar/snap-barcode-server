package websocket

import "snap-barcode-server/utils"

type Config struct {
	Host string
	Port string
}

var WSConfig = Config{
	Host: utils.GetLocalIP(),
	Port: "4858",
}

package utils

import "net"

func GetLocalIP() string {

	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return "localhost"
	}

	for _, addr := range addrs {

		ipnet, ok := addr.(*net.IPNet)

		if ok && !ipnet.IP.IsLoopback() {

			if ipnet.IP.To4() != nil {
				return ipnet.IP.String()
			}
		}
	}

	return "localhost"
}

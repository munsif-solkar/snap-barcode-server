package automation

import (
	"fmt"

	"github.com/go-vgo/robotgo"
)

func ExecuteAutomation(code string) {

	fmt.Println("Barcode received:", code)

	if !Settings.EnableTyping {
		return
	}

	TypeText(code)

	if Settings.PressEnter {
		PressEnter()
	}
}

func TypeText(text string) {

	fmt.Println("Typing text:", text)
	robotgo.Type(text)

}

func PressEnter() {

	fmt.Println("ENTER pressed")
	robotgo.KeyTap("enter")

}

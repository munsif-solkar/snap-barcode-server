package automation

import (
	"fmt"
	"time"
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

	for _, char := range text {

		fmt.Print(string(char))

		time.Sleep(
			time.Duration(Settings.TypingDelay) * time.Millisecond,
		)
	}
}

func PressEnter() {

	fmt.Println("ENTER pressed")

	// actual key press logic here

}

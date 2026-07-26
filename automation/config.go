package automation

import (
	"encoding/json"
	"os"
)

type Config struct {
	EnableTyping bool `json:"enableTyping"`
	PressEnter   bool `json:"pressEnter"`
	TypingDelay  int  `json:"typingDelay"`
}

var Settings Config

func LoadConfig() error {

	file, err := os.ReadFile("settings.json")

	if err != nil {
		Settings = Config{
			EnableTyping: true,
			PressEnter:   true,
			TypingDelay:  50,
		}

		return SaveConfig()
	}

	return json.Unmarshal(file, &Settings)
}

func SaveConfig() error {

	data, err := json.MarshalIndent(
		Settings,
		"",
		"  ",
	)

	if err != nil {
		return err
	}

	return os.WriteFile(
		"settings.json",
		data,
		0644,
	)
}

func GetConfig() Config {
	return Settings
}

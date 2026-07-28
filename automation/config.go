package automation

import (
	"encoding/json"
	"os"
	"path/filepath"
)

type Config struct {
	EnableTyping bool `json:"enableTyping"`
	PressEnter   bool `json:"pressEnter"`
	TypingDelay  int  `json:"typingDelay"`
}

var Settings Config

func getSettingsPath() string {
	configDir, err := os.UserConfigDir()
	if err != nil {
		panic(err)
	}

	appDir := filepath.Join(configDir, "SnapBarcodeServer")

	return filepath.Join(appDir, "settings.json")
}

func LoadConfig() error {
	path := getSettingsPath()

	file, err := os.ReadFile(path)

	if err != nil {
		// First launch - create default settings
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
	path := getSettingsPath()

	// Create config directory if it does not exist
	err := os.MkdirAll(filepath.Dir(path), 0755)
	if err != nil {
		return err
	}

	data, err := json.MarshalIndent(
		Settings,
		"",
		"  ",
	)

	if err != nil {
		return err
	}

	return os.WriteFile(
		path,
		data,
		0644,
	)
}

func GetConfig() Config {
	return Settings
}

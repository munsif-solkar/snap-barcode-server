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
	exePath, err := os.Executable()
	if err != nil {
		panic(err)
	}
	exeDir := filepath.Dir(exePath)

	return filepath.Join(exeDir, "automation", "settings.json")
}

func LoadConfig() error {

	path := getSettingsPath()

	file, err := os.ReadFile(path)

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
	path := getSettingsPath()

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

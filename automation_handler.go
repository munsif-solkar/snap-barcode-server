package main

import (
	"snap-barcode-server/automation"
)

func (a *App) GetSettings() automation.Config {
	return automation.GetConfig()
}

func (a *App) UpdateSettings(config automation.Config) error {

	automation.Settings = config

	return automation.SaveConfig()
}

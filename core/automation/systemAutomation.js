const { keyboard, Key } = require("@nut-tree-fork/nut-js");
const {ipcMain} = require('electron')
const {getSettings,updateSettings} = require('../settings/settingsStore')


let settings = getSettings()

function automationConfig(newSettings){
    settings = updateSettings(newSettings)
}

async function typeCode(code) {
  if (!settings.typing) return;

  keyboard.config.autoDelayMs = settings.keyboardDelay;
  await keyboard.type(code);
}

async function pressEnter() {
  if (!settings.pressEnter) return;

  await keyboard.type(Key.Enter);
}

async function executeAutomation(data){
    await typeCode(data)
    await pressEnter()
}


ipcMain.on("update-automation-settings", (event, data) => {
  automationConfig(data)
  console.log("Updated settings:", settings);
});

module.exports = {automationConfig,executeAutomation}
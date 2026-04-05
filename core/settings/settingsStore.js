let settings = {
  typing: true,
  pressEnter: false,
  keyboardDelay: 50
};

function getSettings() {
  return settings;
}

function updateSettings(newSettings) {
  settings = { ...settings, ...newSettings };
  return settings
}

module.exports = {getSettings,updateSettings}
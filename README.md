# snap-barcode-server

A lightweight Electron-based server that receives barcode data from a mobile app and automates system-level actions like typing and key presses.

Designed to act as a bridge between **Android scanner app → desktop automation system**.

---

## Features

- 📡 Real-time barcode receiving via socket connection
- 💻 Desktop automation using keyboard injection
- ⌨️ Optional auto-type mode
- ⏎ Optional auto-press Enter after scan
- 🪟 Windows executable support (Electron)
- 🎛️ Simple UI for connection status
- ⚙️ Configurable automation behavior

---

## Use Case

- Inventory systems
- Warehouse barcode tracking
- POS systems
- Data entry automation
- Office workflow automation

---

## Architecture

Android App → WebSocket → Electron Server → Keyboard Automation → OS Input

## Getting Started

### 1. Install dependencies

```bash
npm install
```
### 2. Run app

```bash
npm start
```

## ⚠️ Important Note

This application controls system keyboard input.

Use only in trusted environments.

---

## 📜 License

This project is licensed under the MIT License.

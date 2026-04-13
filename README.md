# Snap Barcode Server

A lightweight Electron-based server that receives barcode data from a mobile app and automates system-level actions like typing and key presses.

Designed to act as a bridge between **Android scanner app → desktop automation system**.

- 📱 **Android Client App:**  
   https://github.com/munsif-solkar/snap-barcode-client

---

## Architecture

Android App → WebSocket → Electron Server → Keyboard Automation → OS Input

## Getting Started

### 1. Clone repo
```bash
git clone https://github.com/munsif-solkar/snap-barcode-server.git && cd snap-barcode-server

# Move to directory
cd snap-barcode-server
```

### 2. Install dependencies

```bash
npm install
```
### 3. Run app

```bash
npm start
```

## ⚠️ Important Note

This application controls system keyboard input.

Use only in trusted environments.

---

## 📜 License

This project is licensed under the MIT License.

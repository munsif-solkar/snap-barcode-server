# Snap Barcode Server

A lightweight **Go + Wails** desktop application that receives barcode data from a mobile app over WebSocket and automates system-level actions such as typing scanned barcodes and simulating key presses.

It acts as a bridge between **Android Scanner App → Go Server → Desktop Automation**.

*  **Android Client App:**
  https://github.com/munsif-solkar/snap-barcode-client

---

## Architecture

```
Android App
      │
      ▼
   WebSocket
      │
      ▼
Go (Wails) Server
      │
      ▼
RobotGo Automation
      │
      ▼
Operating System Input
```

---

## Features

* Real-time barcode data transfer via WebSocket
* Automatic keyboard typing using RobotGo
* Optional automatic Enter key press after typing
* Configurable typing and automation settings
* Cross-platform desktop application built with Wails

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/munsif-solkar/snap-barcode-server.git
cd snap-barcode-server
```

### 2. Install frontend dependencies

```bash
cd frontend && npm install
```

### 3. Run the application in development mode

```bash
wails dev
```

### 4. Build the application

```bash
wails build
```

---

## ⚠️ Important Note

This application can simulate keyboard input and interact with your operating system.

Use it only in trusted environments and ensure the target application is focused before enabling automatic typing.

---

## 📜 License

This project is licensed under the MIT License.

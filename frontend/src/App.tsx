import { useEffect, useState } from "react";

import "@/index.css";

import Navbar from "@/components/layouts/Navbar"
import { Button } from "./components/ui/button";
import { StartSocketServer, StopSocketServer } from "../wailsjs/go/main/App"
import { EventsOn } from "../wailsjs/runtime/runtime";
import { GetSettings } from "../wailsjs/go/main/App";
import { UpdateSettings } from "../wailsjs/go/main/App";
import type { SettingKey, Settings } from "../types/automation";
import { PillToggle } from "./components/ui/PillTogle";
import { QRCodeSVG } from 'qrcode.react';



function App() {
  const [server, setServerStatus] = useState(false);
  const [serverIp, setServerIp] = useState<any>(null);
  const [clientConnected, setClientConnected] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [serverDetailsVisible, setServerDetailsVisible] = useState(true);

  const [settings, setSettings] = useState<Settings>({
    enableTyping: false,
    pressEnter: false,
    typingDelay: 50
  });

  async function handleClick() {
    setError(null)
    if (server) {
      try {
        await StopSocketServer();
        setServerStatus(false);
        setServerDetailsVisible(true);
      } catch (error) {
        console.error("Error calling StopSocketServer:", error);
      }
      return;
    }
    try {
      const serverIp = await StartSocketServer();
      setServerStatus(true);
      setServerIp(serverIp);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      console.error("Error calling StartSocketServer:", error);
    }
  }

  EventsOn("client-connected", () => {
    setClientConnected(true);
    console.log("Client connected");
  });

  EventsOn("client-disconnected", () => {
    setClientConnected(false);
    console.log("Client disconnected");
  });

  EventsOn("message-received", (msg: string) => {
    setMessage(msg);
    console.log("Message received:", msg);
  });


  async function loadSettings() {

    const settings = await GetSettings();
    setSettings(settings);
    console.log(settings);
  }

  const handleToggle = async (key: SettingKey) => {

    const updatedSettings: Settings = {
      ...settings,
      [key]: !settings[key]
    };

    // update UI immediately
    setSettings(updatedSettings);

    // save to Go backend
    try {
      await UpdateSettings(updatedSettings);
      console.log("Settings updated");
    } catch (err) {
      console.error("Failed to update settings:", err);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);


  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-md mt-16">
        <div className="mx-auto max-w-md space-y-2">

          <p className="text-secondary">Capture barcode and QR code data via camera input and transmit it to your PC.</p>
        </div>

        <p className="mt-3 text-secondary">{error && <span className="text-red-500">{error}</span>}</p>



        <div className="server-info mt-3 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <Button variant="snap_barcode_server_button" size="lg" onClick={handleClick} className={`${server
              ? "bg-[#3a3737] hover:bg-[#524e4e]"
              : "bg-[#2C687B] hover:bg-[#4E8D9C]"
              }`}>
              {
                server ? "Stop" : "Start"
              }
            </Button>



            <div className="app-settings flex items-center w-full justify-around gap-3 ">



              <PillToggle
                label="Press Enter"
                checked={settings.pressEnter}
                onCheckedChange={() => handleToggle("pressEnter")}
                title="Press enter key after typing barcode to your system"
              />

              <PillToggle
                label="Enable Typing"
                checked={settings.enableTyping}
                onCheckedChange={() => handleToggle("enableTyping")}
                title="Press enter key after typing barcode to your system"
              />





            </div>


          </div>



        </div>
        {server && (
          <div className="server-details mt-3 p-3 bg-white  rounded-md shadow-md">
            <div className="flex items-center justify-between">
            <p className="text-secondary">Server details</p>
            <button className="text-sm text-black px-2 py-0.5 rounded-full border border-gray-700" onClick={() => setServerDetailsVisible(!serverDetailsVisible)}>
             <p className=""> {serverDetailsVisible ? "Hide" : "Show"}</p>
            </button>
            </div>
            
            <section className={`transition-all duration-300 ease-in-out ${serverDetailsVisible ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
            <div className="server-address px-2 flex flex-row items-center justify-between bg-gray-100 py-3 rounded-sm mt-3">
              <div>
                <p>Server running on</p>
                <p
                  id="server-host"
                  className="text-[#2C687B] text-[20px] font-medium"
                >
                  {serverIp}
                </p>
              </div>

              <div>
                <p
                  className={`px-3 py-1 rounded-full font-medium transition-colors`}
                >
                  {clientConnected ? "Connected" : "Waiting for connection"}
                </p>
              </div>


            </div>

            {/* qr code */}

            <div className="flex flex-row items-center justify-between gap-3 p-2 mt-2">
              <div className="w-1/2">
              <h1>Scan to connect</h1>
              <p className="text-secondary">Open the SnapBarcode app on your device and scan the QR code to connect.</p>
              </div>
              <QRCodeSVG
                value={serverIp || ""}
                size={100}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
              />
            </div>
            </section>
          </div>

        )}



        <p className="mt-3 text-sm text-gray-600">{message ? `Last message received: ${message}` : ""}</p>
      </div>

    </>

  );
}

export default App;

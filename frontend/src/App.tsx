import { useEffect, useState } from "react";

import "@/index.css";

import Navbar from "@/components/layouts/Navbar"
import { Button } from "./components/ui/button";
import {
  StartSocketServer,
  StopSocketServer,
  GetSettings,
  UpdateSettings,
} from "../wailsjs/go/main/App";
import { EventsOn } from "../wailsjs/runtime/runtime";
import type { SettingKey, Settings } from "../types/automation";
import { PillToggle } from "./components/ui/PillTogle";
import ServerDetails from "./components/layouts/ServerDetails";
import { cn } from "./lib/utils";



function App() {
  const [server, setServerStatus] = useState(false);
  const [serverIp, setServerIp] = useState<string | null>(null);
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
    const offConnected = EventsOn("client-connected", () => {
      setClientConnected(true);
    });

    const offDisconnected = EventsOn("client-disconnected", () => {
      setClientConnected(false);
    });

    const offMessage = EventsOn("message-received", (msg: string) => {
      setMessage(msg);
    });

    return () => {
      offConnected();
      offDisconnected();
      offMessage();
    };
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
            <Button variant="snap_barcode_server_button" size="lg" onClick={handleClick} className={cn(
              server
                ? "bg-(--theme-secondary) hover:bg-[#524e4e]"
                : "bg-(--app-theme) hover:bg-[#4E8D9C]"
            )}>
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
          <ServerDetails
            serverIp={serverIp}
            clientConnected={clientConnected}
            serverDetailsVisible={serverDetailsVisible}
            setServerDetailsVisible={setServerDetailsVisible}
          />
        )}



        <p className="mt-3 text-sm text-gray-600">{message && `Last message received: ${message}`}</p>
      </div>

    </>

  );
}

export default App;

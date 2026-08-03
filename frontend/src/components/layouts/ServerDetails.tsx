import { QRCodeSVG } from "qrcode.react";

interface ServerDetailsProps {
    serverIp: string | null;
    clientConnected: boolean;
    serverDetailsVisible: boolean;
    setServerDetailsVisible: (visible: boolean) => void;
}

import { TbPlugConnectedX} from "react-icons/tb";
import { PiPlugsConnectedFill } from "react-icons/pi";

function ServerDetails( { serverIp, clientConnected, serverDetailsVisible, setServerDetailsVisible }: ServerDetailsProps) {
    return (<div className="server-details mt-3 p-3 bg-white  rounded-md shadow-md">
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
                  {clientConnected ? <PiPlugsConnectedFill size={30} /> : <TbPlugConnectedX size={30} />}
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
    );
}

export default ServerDetails;
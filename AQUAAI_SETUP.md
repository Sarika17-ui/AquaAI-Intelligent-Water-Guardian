# AquaAI / JAL RAKSHA — Complete Beginner Setup Guide

This guide walks you through connecting your ESP32 simulation in Wokwi to ThingSpeak, and visualizing the live sensor telemetry in your **JAL RAKSHA — Water Quality Command Center** website.

---

## 1. Configuring ThingSpeak Credentials Locally

1. Create a free account at [ThingSpeak.com](https://thingspeak.com).
2. Create a new channel named `AquaAI ESP32 Monitor`.
3. In channel settings, enable:
   - **Field 1**: `TDS_ADC`
   - **Field 2**: `Turbidity_ADC`
4. Set channel visibility:
   - In the **Sharing** tab, select **Share channel view with everyone** (Public view).
5. Copy your **Channel ID** (a number like `2891234`) and your **Write API Key** from the **API Keys** tab.
6. In your local project folder, open `aquaai/firmware/`:
   - Copy `config.example.h` and rename the copy to `config.h`.
   - Open `config.h` in your text editor and fill in your credentials:
     ```cpp
     #define THINGSPEAK_CHANNEL_ID "YOUR_NUMERIC_CHANNEL_ID"
     #define THINGSPEAK_WRITE_API_KEY "YOUR_WRITE_API_KEY"
     ```
   - Keep `AQUAAI_SENSOR_MODE` set to `AQUAAI_MODE_SIMULATION`.
   - Leave `AQUAAI_WIFI_SSID` as `"Wokwi-GUEST"` and `AQUAAI_WIFI_CHANNEL` as `6`.

> [!SECURITY NOTE]
> `config.h` is excluded by `.gitignore`. Never commit your Write API Key to Git or share it publicly.

---

## 2. Opening the Wokwi Project

1. Go to [Wokwi.com](https://wokwi.com) in your browser.
2. Under "Start from Scratch", select **ESP32** $\rightarrow$ **ESP32 (Arduino)**.
3. You will see an empty project with `sketch.ino` and a simulated ESP32 board.
4. In the Wokwi editor tabs:
   - Click the **diagram.json** tab and replace all contents with the contents of [`aquaai/firmware/diagram.json`](file:///c:/Users/sanje/Downloads/Jal%20Rakshak/aquaai/firmware/diagram.json).
   - This automatically creates the ESP32 board and two potentiometers:
     - **TDS Potentiometer**: VCC $\rightarrow$ 3V3, GND $\rightarrow$ GND, Signal $\rightarrow$ **GPIO34**.
     - **Turbidity Potentiometer**: VCC $\rightarrow$ 3V3, GND $\rightarrow$ GND, Signal $\rightarrow$ **GPIO35**.
5. In Wokwi, click the downward arrow next to the tab bar and select **New File**.
   - Name the file `config.h`.
   - Paste the contents of your local `aquaai/firmware/config.h` (with your Channel ID and Write API Key).
6. In the `sketch.ino` tab in Wokwi, replace all code with the contents of [`aquaai/firmware/sketch.ino`](file:///c:/Users/sanje/Downloads/Jal%20Rakshak/aquaai/firmware/sketch.ino).

---

## 3. Starting the ESP32 Simulation

1. In Wokwi, click the green **Play / Start Simulation** button at the top of the canvas.
2. The simulation will compile and boot the virtual ESP32.

---

## 4. Opening the Serial Monitor

1. The Serial Monitor opens automatically at the bottom of the Wokwi window (115200 baud).
2. If it is closed, click the terminal icon at the bottom of the simulator window.

---

## 5. Verifying Wi-Fi Connection

1. In the Serial Monitor, observe the startup logs:
   ```text
   AquaAI ESP32 dual-input monitor
   Mode: SIMULATION | Device ID: AQUAAI-ESP32-01
   TDS input: GPIO34 | Turbidity input: GPIO35
   Inputs are simulated potentiometers; readings are raw ADC counts, not ppm or NTU.
   ThingSpeak channel: 2891234
   Connecting to Wi-Fi SSID: Wokwi-GUEST
   Wi-Fi connected; IP: 10.0.1.2
   ```
2. Once `Wi-Fi connected` appears, the ESP32 is online in the simulation network.

---

## 6. Verifying ThingSpeak Upload Success

1. Every second, the firmware samples the two analog inputs:
   ```text
   SIMULATION | TDS input: 512 ADC counts (~0.41 V) | Turbidity input: 768 ADC counts (~0.62 V) | elapsed: 1 s
   ```
2. Every 20 seconds, the firmware uploads the latest readings:
   ```text
   Uploading ADC fields to ThingSpeak over HTTPS...
   ThingSpeak update succeeded; entry ID: 1
   ```
3. A positive entry ID (e.g. `1`, `2`, `3`) confirms that ThingSpeak accepted and stored the reading.

---

## 7. Checking Field 1 and Field 2 in ThingSpeak

1. Open your channel on [ThingSpeak.com](https://thingspeak.com).
2. Go to the **Private View** or **Public View** tab.
3. You should see two charts updating:
   - **TDS_ADC** (Field 1): Shows the raw ADC count from the TDS potentiometer.
   - **Turbidity_ADC** (Field 2): Shows the raw ADC count from the Turbidity potentiometer.
4. In Wokwi, click and turn either potentiometer dial. Within 20 seconds, the next point on ThingSpeak will reflect your change.

---

## 8. Running the Existing Website

The project uses a Python backend (FastAPI) and a vanilla JavaScript frontend.

Open PowerShell in the project directory:
```powershell
Set-Location "C:\Users\sanje\Downloads\Jal Rakshak"
```

### Option A: Standard Full-Stack Server (FastAPI + Frontend)
```powershell
.\.venv-1\Scripts\python.exe -m uvicorn main:app --reload --port 8000
```
Open **`http://localhost:8000`** in your browser.

### Option B: Standalone Frontend Only
```powershell
python -m http.server 8000
```
Open **`http://localhost:8000`** in your browser.

---

## 9. Connecting the Website to the Existing Channel

1. Open `http://localhost:8000` in your browser.
2. In the left navigation menu, click **Live Monitoring**.
3. Scroll to the **AQUAAI · THINGSPEAK** card:
   - In the **Public ThingSpeak Channel ID** input box, enter your numeric Channel ID.
   - Click **Connect channel**.
4. The dashboard will load your live telemetry:
   - **TDS input · GPIO34**: Displays live raw ADC count (e.g., `512 ADC counts`) and nominal voltage estimate (`0.41 V`).
   - **Turbidity input · GPIO35**: Displays live raw ADC count (e.g., `768 ADC counts`) and nominal voltage estimate (`0.62 V`).
   - **Recent raw ADC readings chart**: Renders historical curves for Field 1 and Field 2.
   - **Latest cloud timestamp**: Shows the timestamp from ThingSpeak.
   - **Last successful check**: Shows your local browser fetch time.
   - **Operating Mode**: Displays `SIMULATION · THINGSPEAK`.
5. The page automatically polls ThingSpeak every 20 seconds while the Live Monitoring tab is active. You can also click **Refresh** anytime.

---

## 10. Troubleshooting Common Errors

| Error Message / Symptom | Cause | Solution |
|---|---|---|
| **"ThingSpeak upload skipped"** | Placeholder values in `config.h` | Ensure `config.h` has your real numeric Channel ID and Write API Key. |
| **"Wi-Fi connection timed out"** | Wi-Fi channel mismatch | Ensure `AQUAAI_WIFI_SSID` is `"Wokwi-GUEST"` and `AQUAAI_WIFI_CHANNEL` is `6` in Wokwi. |
| **"ThingSpeak update failed: HTTP 400"** | Invalid API Key or field name | Confirm the Write API Key matches your ThingSpeak channel and Field 1/2 are enabled. |
| **"Could not load channel feed" on website** | Channel is private or wrong ID | In ThingSpeak, go to **Sharing** $\rightarrow$ select **Share channel view with everyone**. If keeping private, configure `THINGSPEAK_READ_API_KEY` in `.env` and run Option A. |
| **"Waiting for first reading"** | No readings uploaded yet | Wait 20 seconds for the ESP32 in Wokwi to perform its first upload, then click **Refresh**. |
| **"Device data is stale"** | ESP32 stopped sending data | Check Wokwi Serial Monitor to verify the simulation is still running. |
| **Values do not match potentiometer** | Click the dial to turn it | In Wokwi, click the potentiometer dial, then use mouse drag or arrow keys to adjust voltage. |

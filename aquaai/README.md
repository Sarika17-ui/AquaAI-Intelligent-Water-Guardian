# AquaAI ESP32 + ThingSpeak prototype

The ESP32 data feed is integrated into the existing Jal Raksha website's **Live Monitoring** page. The default firmware configuration is simulation mode. Live-hardware mode is available only after the exact sensors and safe signal ranges are verified and entered in the local firmware configuration. The website, routes, demo data, search, notification, and Voice Guide remain in place.

## Data flow

```text
ESP32 DevKit V1 (SIMULATION or verified LIVE_HARDWARE mode)
  GPIO34 ← TDS input (raw ADC)
  GPIO35 ← turbidity input (raw ADC)
  Wi-Fi: Wokwi-GUEST
  HTTPS POST, every 20 seconds
       ↓
ThingSpeak channel
  Field 1: TDS_ADC (raw ADC count)
  Field 2: Turbidity_ADC (raw ADC count)
       ↓ public channel feed
Existing website → Live Monitoring → AquaAI ESP32 sensor inputs
```

The website makes a public feed request every 20 seconds only while the Live Monitoring page is open. It displays the mode tag sent with each reading, and its chart/change checks use only entries tagged with the latest entry's mode. It never receives or stores the ThingSpeak Write API Key. No read key is needed for the selected **public channel** setup.

## 1. Create and configure the ThingSpeak channel

1. Sign in to ThingSpeak and create a channel named `AquaAI ESP32 Monitor`.
2. Enable and name **Field 1** `TDS_ADC`.
3. Enable and name **Field 2** `Turbidity_ADC`.
4. Optionally make **Field 3** `Uptime_Seconds` if you extend the firmware later; the provided firmware records device ID and operating mode in ThingSpeak's status field.
5. Set the channel **Public View** to public. The website intentionally reads the unauthenticated public feed.
6. Copy the numeric Channel ID and the channel's **Write API Key** from API Keys. Never put the Write API Key in the website, browser storage, screenshots, or public Wokwi project.

## 2. Configure and run the Wokwi simulation

1. Copy `aquaai/firmware/config.example.h` to `aquaai/firmware/config.h` (this local file is ignored by git).
2. Set `THINGSPEAK_CHANNEL_ID` and `THINGSPEAK_WRITE_API_KEY` in `config.h`. Keep this file private. Leave `AQUAAI_SENSOR_MODE` as `AQUAAI_MODE_SIMULATION` for Wokwi; the Wokwi Wi-Fi SSID is `Wokwi-GUEST` and the password is empty.
3. In Wokwi, create a new Arduino **ESP32 DevKit V1** project. Add `sketch.ino` and `diagram.json` from `aquaai/firmware`. Use the default Arduino ESP32 core; the code uses its built-in Wi-Fi, ADC and HTTP libraries, so no external library is needed.
4. Check the virtual connections:
   - TDS simulation pot: VCC → 3V3, GND → GND, SIG → GPIO34.
   - Turbidity simulation pot: VCC → 3V3, GND → GND, SIG → GPIO35.
5. Start the simulation and open the Serial Monitor at 115200 baud. Adjust either potentiometer (click it first, then use Left/Right or Page Up/Page Down).
6. Watch the labelled raw ADC counts. The firmware attempts a ThingSpeak update only once every 20 seconds; a successful update prints a positive ThingSpeak entry ID. Failed requests are delayed until the next 20-second interval, not retried in a tight loop.
7. Open the ThingSpeak channel's **Private View** and confirm new entries. In the channel **Public View**, confirm fields 1 and 2 show the counts. ThingSpeak automatically timestamps each entry; status includes the device ID and operating mode (`SIMULATION`).

### Enabling live hardware mode (only after electrical verification)

The firmware can read raw ADC counts from GPIO34 (TDS) and GPIO35 (turbidity) in `LIVE_HARDWARE` mode, but it cannot protect an ESP32 pin from an over-voltage signal. The workspace contains no manufacturer datasheets confirming the exact physical sensors' models, supply limits, or analog-output ranges. Do not connect either physical sensor or enable live mode until those specifications are verified. ESP32 input pins are not 5 V tolerant.

After obtaining manufacturer documentation for both exact sensor/interface-board models, verify each analog output's maximum voltage under the chosen supply and operating conditions. If a divider or signal-conditioning stage is required, calculate and verify its maximum output too. Only then set these local `config.h` values:

```cpp
#define AQUAAI_SENSOR_MODE AQUAAI_MODE_LIVE_HARDWARE
#define AQUAAI_TDS_MAX_OUTPUT_MV <verified maximum voltage at GPIO34>
#define AQUAAI_TURBIDITY_MAX_OUTPUT_MV <verified maximum voltage at GPIO35>
```

Replace both placeholders with verified integer millivolt values from 1 through 3300. The firmware rejects a live-mode build when either value is unset or exceeds 3300 mV. This compile-time check validates the declarations only; it does not measure or limit the physical voltage. Keep raw ADC counts labelled as raw counts: do not convert them to TDS ppm or turbidity NTU without the exact sensor conversion and calibration procedure. The diagram remains Wokwi potentiometers and is not a physical wiring diagram.

### HTTPS note

The firmware uses HTTPS to `api.thingspeak.com` and the ESP32 secure client. For the Wokwi prototype, `setInsecure()` disables TLS certificate verification; the connection is encrypted but the server identity is not verified. This is a simulation convenience, **not production-safe**. Before using real hardware, install the appropriate current CA certificate and use `setCACert()`. The ThingSpeak Write API Key is sent in the HTTPS POST body (not printed or placed in the URL).

## 3. View readings on the existing website

1. Serve the existing website over HTTP (do not open `index.html` as a `file://` URL; browsers restrict cross-origin requests from local files). For example, with Python:

   ```powershell
   Set-Location "C:\Users\sanje\Downloads\Jal Rakshak"
   py -m http.server 8000
   ```

   ThingSpeak integration does not require a local backend. If the existing site's unrelated API is unavailable, the app uses its normal demo dataset; the AquaAI cards still read the public ThingSpeak feed directly.
2. Open `http://127.0.0.1:8000`, choose **Live Monitoring**, enter the public ThingSpeak Channel ID, and choose **Connect channel**. The ID is stored in this browser's local storage. It is not secret.
3. The ESP32 readings, last successful web-feed check, channel timestamp, device/mode, chart, and sudden-change information update from ThingSpeak. Use **Refresh** for an immediate read; otherwise it polls every 20 seconds while Live Monitoring is selected.
4. Confirm the notice says the values are raw, uncalibrated ADC readings.

The Wokwi cloud simulator cannot reach your computer's `localhost` server. That is not a problem here: it sends to ThingSpeak over Wokwi's simulated internet connection, and the browser independently reads the intentionally public ThingSpeak feed.

## Configuration locations

| Setting | File/location | Secret? |
|---|---|---|
| ThingSpeak Channel ID | Local `aquaai/firmware/config.h`; enter the same ID in the website's Live Monitoring panel (or `.env` for backend proxy) | No |
| ThingSpeak Write API Key | Local ignored `aquaai/firmware/config.h` only | **Yes** |
| ThingSpeak Read API Key | Optional `.env` only (for private channel backend proxy) | **Yes** |
| Sensor mode | `config.h` (`AQUAAI_MODE_SIMULATION` by default) | No |
| Verified maximum ADC-pin voltage for each live sensor | `config.h` (`AQUAAI_TDS_MAX_OUTPUT_MV`, `AQUAAI_TURBIDITY_MAX_OUTPUT_MV`) | Must come from exact sensor documentation |
| Wi-Fi SSID / Password / Channel | `config.h` (`Wokwi-GUEST`, channel `6` for Wokwi; router SSID/pass with channel `0` for hardware) | SSID public; password private |
| Channel fields | ThingSpeak channel settings: Field 1 `TDS_ADC`, Field 2 `Turbidity_ADC` | No |

### Public vs Private Channel

- **Public Channel (Default & Simplest)**:
  - In ThingSpeak, navigate to **Sharing** $\rightarrow$ select **Share channel view with everyone**.
  - The website connects directly via browser HTTPS GET requests to ThingSpeak's public feeds API.
  - No backend server or Read API Key is required.
- **Private Channel (Secure Backend Proxy)**:
  - If your channel must remain private, set `THINGSPEAK_CHANNEL_ID` and `THINGSPEAK_READ_API_KEY` in your local `.env`.
  - Start the backend with `uvicorn main:app --port 8000`.
  - The backend provides a secure proxy at `/api/thingspeak/feeds`, keeping the Read API Key strictly on the server and off the browser.

### Automated Testing

Run the included automated test suites to verify firmware calculations, frontend parsing, and backend proxying:
```powershell
# Run backend Python tests (FastAPI proxy & TTS):
.\.venv-1\Scripts\python.exe -m unittest discover tests

# Run frontend parser & signal logic tests (Node.js):
node tests/test_frontend_thingspeak.js
```

## Errors and what they mean

- **Firmware says ThingSpeak is not configured:** the ignored `config.h` is missing or still contains placeholder values. Copy the example, fill both values, then recompile the Wokwi project.
- **Serial Monitor reports HTTP or TLS errors:** check Wi-Fi, API endpoint availability, channel Write API Key, and current ThingSpeak service status. Do not print or paste the key when sharing logs.
- **No entry ID / ThingSpeak returns zero:** the update was unsuccessful; verify key/channel configuration and wait for the next 20-second upload attempt.
- **Website says channel feed unavailable:** check the numeric Channel ID, ensure Public View is enabled, and try Refresh. Check browser console for CORS/network restrictions; the site deliberately doesn't proxy data for a public channel.
- **No readings yet:** wait for the first ESP32 upload (up to 20 seconds), then refresh. The web panel has a distinct empty-data state.
- **Device data stale:** the web request can succeed while the ESP32 has stopped uploading. Check Wokwi's Serial Monitor and ThingSpeak Private View timestamps.
- **Sudden-change panel shows no alert:** an adjacent pair must differ by at least 900 raw ADC counts; move a potentiometer more substantially. The threshold is a signal-change demo, not a water-quality diagnosis.

## Measurement limits and real hardware

The Wokwi potentiometers only simulate changing voltages. The dashboard shows raw ADC counts and a nominal voltage estimate (`ADC × 3.3 / 4095`); ESP32 ADC behavior and reference voltage are not precise enough for that estimate to replace a meter or calibration. It does not call raw ADC counts TDS ppm or turbidity NTU. TDS sensor output requires sensor-specific calibration and conversion; turbidity NTU also requires the exact optical sensor, interface circuit, and validated calibration curve. TDS alone does not determine whether water is safe to drink.

No sensor datasheets or manufacturer documentation are present in the inspected workspace. The description `TDS Meter V1.0` does not establish a unique model/revision, and the turbidity module's exact manufacturer/model is unknown. Before physical wiring can be specified, the missing information is:

- The TDS interface board's manufacturer and exact model/revision, with datasheet specifications for supply voltage and maximum analog output.
- The turbidity interface board/probe's manufacturer and exact model/revision, with datasheet specifications for supply voltage and maximum analog output.
- For any voltage divider or signal conditioner, the verified maximum voltage at the ESP32 pin.

Until these are available, keep the Wokwi diagram and firmware in simulation mode and do not connect physical outputs to GPIO34 or GPIO35. No physical sensor, ThingSpeak credentials, or Wokwi execution are available here, so real-device/cloud operation still requires testing with the user's sensors and account.

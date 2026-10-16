#pragma once

// Wi-Fi Configuration
// For Wokwi simulation: SSID is "Wokwi-GUEST", password is empty, channel is 6.
// For physical hardware: Enter your router's SSID and password, and set channel to 0 (auto-scan).
#define AQUAAI_WIFI_SSID "Wokwi-GUEST"
#define AQUAAI_WIFI_PASSWORD ""
#define AQUAAI_WIFI_CHANNEL 6

// Operating Mode Configuration
// Keep simulation mode until both physical sensors and their signal ranges
// have been verified. Live mode intentionally fails to compile while either
// maximum ADC-pin voltage is unset or exceeds 3.3 V (3300 mV).
#define AQUAAI_MODE_SIMULATION 0
#define AQUAAI_MODE_LIVE_HARDWARE 1
#define AQUAAI_SENSOR_MODE AQUAAI_MODE_SIMULATION

// Voltage safety limits for live mode (must be verified <= 3300 mV with multimeter or datasheet)
#define AQUAAI_TDS_MAX_OUTPUT_MV 0
#define AQUAAI_TURBIDITY_MAX_OUTPUT_MV 0

// ThingSpeak Channel Configuration
// Configure Field 1 as TDS_ADC and Field 2 as Turbidity_ADC.
// The Write API Key is PRIVATE: never commit it or put it in client-side code.
#define THINGSPEAK_CHANNEL_ID "YOUR_THINGSPEAK_CHANNEL_ID"
#define THINGSPEAK_WRITE_API_KEY "YOUR_THINGSPEAK_WRITE_API_KEY"

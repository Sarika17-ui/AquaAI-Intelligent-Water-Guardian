#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>

#if __has_include("config.h")
#include "config.h"
#endif

#ifndef AQUAAI_WIFI_SSID
#define AQUAAI_WIFI_SSID "Xiaomi 11 Lite NE"
#endif
#ifndef AQUAAI_WIFI_PASSWORD
#define AQUAAI_WIFI_PASSWORD "12345678"
#endif
#ifndef AQUAAI_WIFI_CHANNEL
#define AQUAAI_WIFI_CHANNEL 6
#endif
#ifndef THINGSPEAK_CHANNEL_ID
#define THINGSPEAK_CHANNEL_ID "3530012"
#endif
#ifndef THINGSPEAK_WRITE_API_KEY
#define THINGSPEAK_WRITE_API_KEY "UNSEJI9ROITJJ317"
#endif

#ifndef AQUAAI_MODE_SIMULATION
#define AQUAAI_MODE_SIMULATION 0
#endif
#ifndef AQUAAI_MODE_LIVE_HARDWARE
#define AQUAAI_MODE_LIVE_HARDWARE 1
#endif
#ifndef AQUAAI_SENSOR_MODE
#define AQUAAI_SENSOR_MODE AQUAAI_MODE_SIMULATION
#endif
#ifndef AQUAAI_TDS_MAX_OUTPUT_MV
#define AQUAAI_TDS_MAX_OUTPUT_MV 0
#endif
#ifndef AQUAAI_TURBIDITY_MAX_OUTPUT_MV
#define AQUAAI_TURBIDITY_MAX_OUTPUT_MV 0
#endif

#if AQUAAI_SENSOR_MODE != AQUAAI_MODE_SIMULATION \
    && AQUAAI_SENSOR_MODE != AQUAAI_MODE_LIVE_HARDWARE
#error "AQUAAI_SENSOR_MODE must be AQUAAI_MODE_SIMULATION or AQUAAI_MODE_LIVE_HARDWARE."
#endif

#if AQUAAI_SENSOR_MODE == AQUAAI_MODE_LIVE_HARDWARE
#if AQUAAI_TDS_MAX_OUTPUT_MV < 1 || AQUAAI_TDS_MAX_OUTPUT_MV > 3300
#error "Live hardware mode requires a verified TDS maximum ADC-pin voltage from 1 to 3300 mV."
#endif
#if AQUAAI_TURBIDITY_MAX_OUTPUT_MV < 1 || AQUAAI_TURBIDITY_MAX_OUTPUT_MV > 3300
#error "Live hardware mode requires a verified turbidity maximum ADC-pin voltage from 1 to 3300 mV."
#endif
#endif

namespace {
constexpr uint8_t TDS_PIN = 34;
constexpr uint8_t TURBIDITY_PIN = 35;
constexpr uint8_t ADC_SAMPLES = 16;
constexpr uint32_t SAMPLE_INTERVAL_MS = 1000;
constexpr uint32_t THINGSPEAK_UPDATE_INTERVAL_MS = 20000;
constexpr uint32_t WIFI_RETRY_INTERVAL_MS = 10000;
constexpr uint32_t WIFI_CONNECT_TIMEOUT_MS = 8000;
constexpr uint16_t HTTP_TIMEOUT_MS = 7000;
constexpr float ADC_MAX_COUNT = 4095.0f;
constexpr float ADC_REFERENCE_VOLTAGE = 3.3f;
constexpr char DEVICE_ID[] = "AQUAAI-ESP32-01";
#if AQUAAI_SENSOR_MODE == AQUAAI_MODE_LIVE_HARDWARE
constexpr char SENSOR_MODE[] = "LIVE_HARDWARE";
#else
constexpr char SENSOR_MODE[] = "SIMULATION";
#endif
constexpr int ADC_CHANGE_ALERT_THRESHOLD = 900;
constexpr char THINGSPEAK_UPDATE_URL[] = "https://api.thingspeak.com/update.json";

uint32_t lastSampleAt = 0;
uint32_t lastUploadAttemptAt = 0;
uint32_t lastWiFiAttemptAt = 0;
uint32_t wifiConnectStartedAt = 0;
bool wifiAttemptActive = false;
bool hasWiFiAttempted = false;
bool hasUploadedAttempt = false;
int latestTdsAdc = 0;
int latestTurbidityAdc = 0;
int previousTdsAdc = -1;
int previousTurbidityAdc = -1;

bool thingspeakIsConfigured() {
  return strlen(THINGSPEAK_CHANNEL_ID) > 0
      && strcmp(THINGSPEAK_CHANNEL_ID, "YOUR_THINGSPEAK_CHANNEL_ID") != 0
      && strlen(THINGSPEAK_WRITE_API_KEY) > 0
      && strcmp(THINGSPEAK_WRITE_API_KEY, "YOUR_THINGSPEAK_WRITE_API_KEY") != 0;
}

int readAverageAdc(uint8_t pin) {
  uint32_t sum = 0;
  for (uint8_t sample = 0; sample < ADC_SAMPLES; ++sample) {
    sum += analogRead(pin);
    delay(2);
  }
  return static_cast<int>((sum + ADC_SAMPLES / 2) / ADC_SAMPLES);
}

float estimateAdcVoltage(int adcCount) {
  return adcCount * ADC_REFERENCE_VOLTAGE / ADC_MAX_COUNT;
}

long parseEntryId(const String& responseBody) {
  int keyPosition = responseBody.indexOf("\"entry_id\"");
  if (keyPosition < 0) {
    keyPosition = responseBody.indexOf("\"id\"");
  }
  if (keyPosition >= 0) {
    const int colonPosition = responseBody.indexOf(':', keyPosition);
    if (colonPosition >= 0) {
      const char* firstDigit = responseBody.c_str() + colonPosition + 1;
      while (*firstDigit == ' ' || *firstDigit == '\t') ++firstDigit;
      char* end = nullptr;
      const long entryId = strtol(firstDigit, &end, 10);
      if (end != firstDigit) return entryId;
    }
  }

  // Also support plain numeric text response (e.g. from ThingSpeak /update)
  const char* str = responseBody.c_str();
  while (*str == ' ' || *str == '\t' || *str == '\r' || *str == '\n') ++str;
  char* end = nullptr;
  const long plainId = strtol(str, &end, 10);
  return (end != str) ? plainId : 0;
}

bool uploadToThingSpeak(int tdsAdc, int turbidityAdc) {
  if (!thingspeakIsConfigured()) {
    Serial.println("ThingSpeak upload skipped: configure channel ID and write key in local config.h.");
    return false;
  }

  WiFiClientSecure client;
  // Wokwi simulation convenience only: this encrypts transport but does not
  // authenticate the server certificate. Install a CA certificate for hardware.
  client.setInsecure();

  HTTPClient http;
  if (!http.begin(client, THINGSPEAK_UPDATE_URL)) {
    Serial.println("ThingSpeak HTTPS setup failed.");
    return false;
  }
  http.setConnectTimeout(HTTP_TIMEOUT_MS);
  http.setTimeout(HTTP_TIMEOUT_MS);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  String body;
  body.reserve(180);
  body += "api_key=";
  body += THINGSPEAK_WRITE_API_KEY;
  body += "&field1=";
  body += String(tdsAdc);
  body += "&field2=";
  body += String(turbidityAdc);
  body += "&status=";
  body += DEVICE_ID;
  body += "%7C";
  body += SENSOR_MODE;

  Serial.println("Uploading ADC fields to ThingSpeak over HTTPS...");
  int httpCode = http.POST(body);
  String responseBody = httpCode > 0 ? http.getString() : String();
  http.end();

  // If HTTPS encounters a network or TLS error (httpCode <= 0), fallback to HTTP
  if (httpCode <= 0) {
    Serial.printf("HTTPS transport notice (code %d). Retrying via HTTP endpoint...\n", httpCode);
    WiFiClient plainClient;
    if (http.begin(plainClient, "http://api.thingspeak.com/update.json")) {
      http.setConnectTimeout(HTTP_TIMEOUT_MS);
      http.setTimeout(HTTP_TIMEOUT_MS);
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      httpCode = http.POST(body);
      responseBody = httpCode > 0 ? http.getString() : String();
      http.end();
    }
  }

  const long entryId = httpCode >= 200 && httpCode < 300 ? parseEntryId(responseBody) : 0;
  if (entryId > 0) {
    Serial.printf("ThingSpeak update succeeded; entry ID: %ld\n", entryId);
    return true;
  }
  if (httpCode > 0) {
    Serial.printf("ThingSpeak update failed: HTTP %d, no positive entry ID returned.\n", httpCode);
  } else {
    Serial.printf("ThingSpeak network error: %d. Will retry on the next 20-second interval.\n", httpCode);
  }
  return false;
}

void maintainWiFi() {
  const uint32_t now = millis();
  if (WiFi.status() == WL_CONNECTED) {
    if (wifiAttemptActive) {
      wifiAttemptActive = false;
      Serial.printf("Wi-Fi connected; IP: %s\n", WiFi.localIP().toString().c_str());
    }
    return;
  }

  if (wifiAttemptActive && now - wifiConnectStartedAt >= WIFI_CONNECT_TIMEOUT_MS) {
    Serial.println("Wi-Fi connection timed out; retry scheduled.");
    WiFi.disconnect();
    wifiAttemptActive = false;
  }
  if (wifiAttemptActive
      || (hasWiFiAttempted && now - lastWiFiAttemptAt < WIFI_RETRY_INTERVAL_MS)) return;

  lastWiFiAttemptAt = now;
  hasWiFiAttempted = true;
  wifiConnectStartedAt = now;
  wifiAttemptActive = true;
  Serial.printf("Connecting to Wi-Fi SSID: %s\n", AQUAAI_WIFI_SSID);
#if defined(AQUAAI_WIFI_CHANNEL) && AQUAAI_WIFI_CHANNEL > 0
  WiFi.begin(AQUAAI_Xiaomi 11 Lite NE, AQUAAI_12345678, AQUAAI_WIFI_CHANNEL);
#else
WiFi.begin(AQUAAI_WIFI_SSID, AQUAAI_WIFI_PASSWORD);
 #endif
}
}  // namespace

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);
  analogSetPinAttenuation(TDS_PIN, ADC_11db);
  analogSetPinAttenuation(TURBIDITY_PIN, ADC_11db);
  pinMode(TDS_PIN, INPUT);
  pinMode(TURBIDITY_PIN, INPUT);
  WiFi.mode(WIFI_STA);
  WiFi.setAutoReconnect(true);

  Serial.println();
  Serial.println("AquaAI ESP32 dual-input monitor");
  Serial.printf("Mode: %s | Device ID: %s\n", SENSOR_MODE, DEVICE_ID);
  Serial.printf("TDS input: GPIO%u | Turbidity input: GPIO%u\n",
    TDS_PIN, TURBIDITY_PIN);
#if AQUAAI_SENSOR_MODE == AQUAAI_MODE_LIVE_HARDWARE
  Serial.printf("Verified configured maximum ADC-pin voltages: TDS %u mV, turbidity %u mV\n",
    AQUAAI_TDS_MAX_OUTPUT_MV, AQUAAI_TURBIDITY_MAX_OUTPUT_MV);
  Serial.println("Confirm physical outputs remain within these verified limits before connecting; ADC readings are raw, not ppm or NTU.");
#else
  Serial.println("Inputs are simulated potentiometers; readings are raw ADC counts, not ppm or NTU.");
#endif
  Serial.printf("ThingSpeak channel: %s\n",
    thingspeakIsConfigured() ? THINGSPEAK_CHANNEL_ID : "not configured");
  maintainWiFi();
}

void loop() {
  maintainWiFi();
  const uint32_t now = millis();
  if (now - lastSampleAt < SAMPLE_INTERVAL_MS) {
    delay(20);
    return;
  }
  lastSampleAt = now;

  latestTdsAdc = readAverageAdc(TDS_PIN);
  latestTurbidityAdc = readAverageAdc(TURBIDITY_PIN);
  Serial.printf("%s | TDS input: %d ADC counts (~%.2f V) | Turbidity input: %d ADC counts (~%.2f V) | elapsed: %lu s\n",
    SENSOR_MODE,
    latestTdsAdc, estimateAdcVoltage(latestTdsAdc),
    latestTurbidityAdc, estimateAdcVoltage(latestTurbidityAdc),
    static_cast<unsigned long>(now / 1000));

  if (previousTdsAdc >= 0
      && abs(latestTdsAdc - previousTdsAdc) >= ADC_CHANGE_ALERT_THRESHOLD) {
    Serial.printf("TDS input sudden change: %d ADC counts (threshold %d).\n",
      abs(latestTdsAdc - previousTdsAdc), ADC_CHANGE_ALERT_THRESHOLD);
  }
  if (previousTurbidityAdc >= 0
      && abs(latestTurbidityAdc - previousTurbidityAdc) >= ADC_CHANGE_ALERT_THRESHOLD) {
    Serial.printf("Turbidity input sudden change: %d ADC counts (threshold %d).\n",
      abs(latestTurbidityAdc - previousTurbidityAdc), ADC_CHANGE_ALERT_THRESHOLD);
  }
  previousTdsAdc = latestTdsAdc;
  previousTurbidityAdc = latestTurbidityAdc;

  const bool updateIntervalElapsed = !hasUploadedAttempt
      || now - lastUploadAttemptAt >= THINGSPEAK_UPDATE_INTERVAL_MS;
  if (!updateIntervalElapsed) return;
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("ThingSpeak upload deferred: Wi-Fi is offline.");
    return;
  }

  // Rate-limit failed attempts too; never retry ThingSpeak in a tight loop.
  lastUploadAttemptAt = now;
  hasUploadedAttempt = true;
  uploadToThingSpeak(latestTdsAdc, latestTurbidityAdc);
}

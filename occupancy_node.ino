

#include <WiFi.h>
#include <HTTPClient.h>
#include <ld2410.h>
#include "secrets.h"

// match the number to the number of tape on the device
const int ROOM_ID   = 2;
const int SENSOR_ID = 2;

//Timing (testing values; for real rooms use VACANT 120000 and HEARTBEAT 30000) ----
const unsigned long VACANT_TIMEOUT_MS = 10000;  // nothing detected this long -> vacant
const unsigned long HEARTBEAT_MS      = 10000;  // re-send current status at least this often
const unsigned long RETRY_MS          = 5000;   // wait before retrying a failed send
const unsigned long WIFI_TIMEOUT_MS   = 20000;  // give up on one Wi-Fi attempt after this
const unsigned long WIFI_RETRY_MS     = 10000;  // wait between Wi-Fi attempts
const uint16_t      HTTP_TIMEOUT_MS   = 5000;

ld2410 radar;
HardwareSerial RadarSerial(2);

bool occupied = false;
unsigned long lastSeenMs = 0;       // last time the sensor saw a target
bool needSend = true;               // true = a state change hasn't been delivered yet (sends on boot)
bool lastAttemptFailed = false;
unsigned long lastAttemptMs = 0;
unsigned long lastSuccessMs = 0;
unsigned long lastWifiTryMs = 0;
unsigned long lastDebugMs = 0;

void connectWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;
  Serial.print("Connecting to Wi-Fi");
  WiFi.mode(WIFI_STA);
  WiFi.disconnect(true);   // cancel any attempt still in progress
  delay(100);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < WIFI_TIMEOUT_MS) {
    delay(500);
    Serial.print(".");
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("\nConnected. ESP32 IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nWi-Fi failed (is it a 2.4 GHz network? name/password right?). Will retry.");
  }
}

// Returns the HTTP status code, or a negative number if the connection failed.
int sendRequest(const char* method, const String& url, const String& body) {
  WiFiClient client;
  HTTPClient http;
  http.setTimeout(HTTP_TIMEOUT_MS);
  http.begin(client, url);
  http.addHeader("Content-Type", "application/json");
  int code = (strcmp(method, "PUT") == 0) ? http.PUT(body) : http.POST(body);
  if (code > 0) {
    Serial.printf("%s %s -> %d  %s\n", method, url.c_str(), code, http.getString().c_str());
  } else {
    Serial.printf("%s %s failed: %s\n", method, url.c_str(), HTTPClient::errorToString(code).c_str());
  }
  http.end();
  return code;
}

bool sendStatus() {
  if (WiFi.status() != WL_CONNECTED) return false;

  String base = String("http://") + SERVER_IP + ":" + SERVER_PORT + "/rooms/";
  String body = String("{\"room_id\":") + ROOM_ID +
                ",\"sensor_id\":" + SENSOR_ID +
                ",\"occupied\":" + (occupied ? "true" : "false") + "}";

  // Update this room's row. The trailing slash is required by the backend.
  int code = sendRequest("PUT", base + ROOM_ID + "/", body);

  // Room isn't in the database yet -> create it once.
  if (code == 404) {
    code = sendRequest("POST", base, body);
  }
  return (code == 200 || code == 201);
}

void setup() {
  Serial.begin(115200);
  delay(500);
  Serial.println("\nOccupancy node starting...");

  RadarSerial.begin(256000, SERIAL_8N1, 16, 17);
  if (radar.begin(RadarSerial)) {
    Serial.println("LD2410 connected.");
  } else {
    Serial.println("LD2410 not found - check wiring (VCC on VIN/5V, TX/RX crossed).");
  }

  connectWiFi();
}

void loop() {
  radar.read();
  unsigned long now = millis();

  // 1. Decide occupied / vacant (hold "occupied" until the timeout passes)
  bool seen = radar.isConnected() &&
              (radar.movingTargetDetected() || radar.stationaryTargetDetected());

  // Debug: show what the sensor sees every 2 seconds
  if (now - lastDebugMs >= 2000) {
    lastDebugMs = now;
    Serial.printf("seen=%d | moving=%d (%u cm) | still=%d (%u cm)\n", seen,
                  radar.movingTargetDetected(), radar.movingTargetDistance(),
                  radar.stationaryTargetDetected(), radar.stationaryTargetDistance());
  }

  if (seen) {
    lastSeenMs = now;
    if (!occupied) {
      occupied = true;
      needSend = true;
      Serial.println("State -> OCCUPIED");
    }
  } else if (occupied && now - lastSeenMs >= VACANT_TIMEOUT_MS) {
    occupied = false;
    needSend = true;
    Serial.println("State -> VACANT");
  }

  // 2. Reconnect to Wi-Fi if it dropped
  if (WiFi.status() != WL_CONNECTED && now - lastWifiTryMs >= WIFI_RETRY_MS) {
    lastWifiTryMs = now;
    connectWiFi();
  }

  // 3. Send on a state change, or as a heartbeat
  bool heartbeatDue = (now - lastSuccessMs >= HEARTBEAT_MS);
  bool retryOk = !lastAttemptFailed || (now - lastAttemptMs >= RETRY_MS);
  if ((needSend || heartbeatDue) && retryOk) {
    lastAttemptMs = millis();
    if (sendStatus()) {
      lastSuccessMs = millis();
      needSend = false;
      lastAttemptFailed = false;
    } else {
      lastAttemptFailed = true;
    }
  }

  delay(10);
}
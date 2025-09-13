#include <WiFi.h>

const char* ssid     = "ESP32-LED-AP";
const char* password = "12345678";   // at least 8 chars

const int ledPin = 2;
bool ledState = LOW;

WiFiServer server(80);

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, ledState);

  WiFi.softAP(ssid, password);
  Serial.println("AP started");
  Serial.print("IP address: ");
  Serial.println(WiFi.softAPIP());

  server.begin();
}

void loop() {
  WiFiClient client = server.available();
  if (!client) return;

  String request = client.readStringUntil('\r');

  if (request.indexOf("/LED=ON") != -1) {
    ledState = HIGH;
    digitalWrite(ledPin, ledState);
  } 
  if (request.indexOf("/LED=OFF") != -1) {
    ledState = LOW;
    digitalWrite(ledPin, ledState);
  }

  String html = "<!DOCTYPE html><html><head>"
                "<meta name='viewport' content='width=device-width, initial-scale=1'>"
                "<style>body{font-family:Arial; text-align:center;}</style>"
                "</head><body>"
                "<h2>ESP32 LED Control</h2>"
                "<p>LED is currently: <b>" + String(ledState ? "ON" : "OFF") + "</b></p>"
                "<p><a href='/LED=ON'><button>Turn ON</button></a></p>"
                "<p><a href='/LED=OFF'><button>Turn OFF</button></a></p>"
                "</body></html>";

  client.println("HTTP/1.1 200 OK");
  client.println("Content-type:text/html");
  client.println();
  client.println(html);
  client.stop();
}

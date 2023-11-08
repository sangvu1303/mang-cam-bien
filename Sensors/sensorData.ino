#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>

#define DHTPIN D1  // Đặt chân kết nối cảm biến DHT11
#define DHTTYPE DHT11

const char* ssid = "VUSANG1303";
const char* password = "13032000";

const char* serverUrl = "http://localhost:6006/store-data";  // Thay thế bằng địa chỉ IP của máy chủ Node.js

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  delay(10);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("WiFi connected");
}

void loop() {
  delay(1000);  // Đọc dữ liệu từ cảm biến sau mỗi 2 giây

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  WiFiClient client;
  if (client.connect(serverUrl, 80)) {
    String postBody = "temperature=" + String(temperature) + "&humidity=" + String(humidity);
    client.println("POST /store-data HTTP/1.1");
    client.println("Host: yourServerIP");
    client.println("Content-Type: application/x-www-form-urlencoded");
    client.print("Content-Length: ");
    client.println(postBody.length());
    client.println();
    client.print(postBody);

    Serial.println("Data sent to server");
  } else {
    Serial.println("Connection to server failed");
  }

  delay(5000);  // Đợi 5 giây trước khi gửi dữ liệu tiếp theo
}

#include <ESP8266WiFi.h>
#include <DHT.h>

// Thông tin mạng WiFi
const char* ssid = "VUSANG1303";
const char* password = "13032000";

// Thông tin cơ sở dữ liệu
const char* serverAddress = "127.0.0.1";
const int serverPort = 6006; // Cổng HTTP mặc định

// Cấu hình cảm biến DHT11
#define DHTPIN D4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  delay(10);
  
  dht.begin();

  // Kết nối WiFi
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Đọc dữ liệu từ cảm biến DHT11
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // Đọc dữ liệu từ cảm biến ánh sáng
  int lightSensorValue = analogRead(A0); // Cổng analog kết nối với cảm biến ánh sáng
  float lightIntensity = map(lightSensorValue, 0, 1023, 0, 100);

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor");
    return;
  }

  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    if (client.connect(serverAddress, serverPort)) {
      String data = "temperature=" + String(temperature) +
                    "&humidity=" + String(humidity) +
                    "&light=" + String(lightIntensity);
      
      client.println("POST /data HTTP/1.1");
      client.println("Host: " + String(serverAddress));
      client.println("Connection: close");
      client.println("Content-Type: application/x-www-form-urlencoded");
      client.print("Content-Length: ");
      client.println(data.length());
      client.println();
      client.println(data);

      Serial.println("Data sent to server");
    } else {
      Serial.println("Connection to server failed");
    }
  } else {
    Serial.println("WiFi Disconnected");
  }

  delay(60000); // Gửi dữ liệu sau mỗi phút (đơn vị: ms)
}

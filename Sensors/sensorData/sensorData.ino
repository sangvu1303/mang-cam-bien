#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <DHTesp.h>

const char* ssid = "VUSANG13";
const char* password = "13032000";

const char* serverUrl = "http://192.168.1.162:6006/";  // Thay thế bằng địa chỉ IP của máy chủ Node.js (ipV4)

DHTesp dht;

void setup() {
  // serial
  Serial.begin(115200);
  delay(10);

  //dht
  dht.setup(5,DHTesp::DHT11);

  //wifi
  Serial.printf("\nConnecting to %s", ssid);
  WiFi.begin(ssid, password);  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected to network");
  Serial.print("My IP address is: ");
  Serial.println(WiFi.localIP());
}

void sendDataToServer(float temperature, float humidity, float light) {
    WiFiClient client;
    if (client.connect("192.168.1.162", 6006)) {
        String postBody = "temperature=" + String(temperature) + "&humidity=" + String(humidity) + "&light=" + String(light);
        client.println("POST / HTTP/1.1");
        client.println("Host: 192.168.1.162:6006");
        client.println("Content-Type: application/x-www-form-urlencoded");
        client.print("Content-Length: ");
        client.println(postBody.length());
        client.println();
        client.print(postBody);

        Serial.println("Data sent to server");
    } else {
        Serial.println("Connection to server failed");
    }
}
void loop() {
  delay(1000);  // Đọc dữ liệu từ cảm biến sau mỗi 1 giây

  float humidity = dht.getHumidity();
  float temperature = dht.getTemperature();
  float light = analogRead(A0);

  if (isnan(humidity) || isnan(temperature) || isnan(light)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }else {
       Serial.println();
       Serial.println(temperature);
       Serial.println(humidity);
       Serial.println(light);
    }
   // Gửi dữ liệu lên server
   sendDataToServer(temperature, humidity, light);

   delay(1000);
}

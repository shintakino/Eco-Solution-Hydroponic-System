#include <WiFi.h>
#include <DHT.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2561_U.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Wifi declaration
const char* ssid = "Your Wifi"; // Replace Wifi Network SSID
const char* password = "Your Password"; // Replace Wifi Network Password

const char* host = "";  // Destination server IP 
const char* hostAPI = "worldtimeapi.org";
const char* timezone = "Asia/Manila"; Change Your Time You can use a Clock Module
const int httpPort = 80;               // HTTP port
// Light Sensor Declation
#define TSL2561_ADDR (0x39) 
Adafruit_TSL2561_Unified tsl = Adafruit_TSL2561_Unified(TSL2561_ADDR, 12345);
float light;
// Dht Sensor Declaration
#define DHTPIN 13      // Pin connected to the DHT sensor
#define DHTTYPE DHT22  // DHT 22 (AM2302) sensor type
DHT dht(DHTPIN, DHTTYPE);
float temperature;
float humidity;
//Water Temp Declaration
int ThermistorPin = A0;
int Vo;
float R1 = 10000;
float logR2, R2, T, Tc, Tf;
float c1 = 1.009249522e-03, c2 = 2.378405444e-04, c3 = 2.019202697e-07;
float waterTemp; // Constant temperature set to 25°C
//TDS Sensor Declaration
namespace pin {
  const byte tds_sensor = A2;
}
namespace device {
  float aref = 3.3;
}
namespace sensor {
  float ecStable = 0;
  float ec = 0;
  unsigned int tds = 0;
  float ecCalibration = 1;
}

//Relays Declaration
namespace relays{
  int fans = 2;
  int waterPump = 3;
  int solutionA = 4;
  int solutionB = 5;
  int solutionUp = 6;
  int solutionDown = 7;
  int growLights = 8;
  int waterPumpMain = 10;
  double temp_min;
  double temp_max;
  double time_duration;
  double ph_min;
  double ph_max;
  double ec_min;
  double ec_max;
  float setTime;
  float currentTime;
  unsigned long lastMillis = 0;  // Variable to store the last time the seconds were stored
  unsigned long runningSeconds = 0;  // Variable to store the total running seconds
  unsigned long previousMillis = 0; // Variable to store the previous time
  unsigned long lightDuration = 0; // Duration for which the LED should be on in milliseconds
  double sendLight = 0;
}

//Ph Declaration
float calibration_value = 21.34 + 1.57;
unsigned long int avgval; 
int buffer_arr[10], temp;
float ph_act;
  

void setup() {
  Serial.begin(115200);
  
  delay(10);
  pinMode(pin::tds_sensor, INPUT);
  pinMode(relays::waterPump, OUTPUT);
  pinMode(relays::solutionA, OUTPUT);
  pinMode(relays::solutionB, OUTPUT);
  pinMode(relays::solutionUp, OUTPUT);
  pinMode(relays::solutionDown, OUTPUT);
  pinMode(relays::growLights, OUTPUT);
  pinMode(relays::waterPumpMain, OUTPUT);
  dht.begin();

  // Connect to Wi-Fi
  Serial.println();
  Serial.println("Connecting to WiFi");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  
}

void loop() {
  // getWatertemp();
  // relayControls();
  getDatabaseData();
  backUptime();
  // getTds();
  // getLight();
  // getTemp();
  // Serial.print(waterTemp);
  // Serial.println(" C");
}

void postSensors(){
  if (relays::sendLight > 0){
  sendData(temperature, humidity, light , sensor::ecStable, ph_act, relays::sendLight);
  }
  else{
    sendData(temperature, humidity, light , sensor::ecStable, ph_act, relays::time_duration);
  }
}

void getTemp(){
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  if (!isnan(temperature) && !isnan(humidity)) {
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.print(" °C\tHumidity: ");
    Serial.print(humidity);
    Serial.println(" %");
    // String url = "/testSend/dht11.php?temperature=" + String(temperature) + "&humidity=" + String(humidity);
    // sendData(url);
  } else {
    Serial.println("Failed to read from DHT sensor");
  }
}

void getLight(){
  sensors_event_t event;
  tsl.getEvent(&event);
  if (event.light) {
    light = event.light;
    Serial.print("Light: ");
    Serial.print(event.light);
    Serial.println(" lux");
    // String url = "/testSend/tsl2561.php?light=" + String(event.light);
    // sendData(url);
  } else {
    Serial.println("Error reading light sensor");
  }
}

void getTds(){
  float rawEc = analogRead(pin::tds_sensor) * device::aref / 4096.0; // read the analog value more stable by the median filtering algorithm, and convert to voltage value //1024
  delay(100);
  float temperatureCoefficient = 1.0 + 0.02 * (waterTemp - 25.0); // temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0));
  sensor::ec = (rawEc / temperatureCoefficient) * sensor::ecCalibration; // temperature and calibration compensation
  sensor::tds = (133.42 * pow(sensor::ec, 3) - 255.86 * sensor::ec * sensor::ec + 857.39 * sensor::ec) * 0.5; //convert voltage value to tds value
  sensor::ecStable = (((133.42 * pow(sensor::ec, 3) - 255.86 * sensor::ec * sensor::ec + 857.39 * sensor::ec) * 0.5)*2)/1000;
  Serial.print(F("TDS:")); Serial.println(sensor::tds);
  Serial.print(F("EC:")); Serial.println(sensor::ecStable,2);
  // Serial.print(F("EC:")); Serial.println(sensor::ec, 2);
  // String url = "/testSend/tds.php?EC=" + String(sensor::ec, 2);
  // sendData(url);
}

// void sendData(String url) {
//   delay(5000);
//   WiFiClient client;
//   if (!client.connect(host, httpPort)) {
//     Serial.println("Connection failed");
//     return;
//   }
//   Serial.println("Sending data to server");
//   client.print(String("GET ") + url + " HTTP/1.1\r\n" +
//                "Host: " + host + "\r\n" +
//                "Connection: close\r\n\r\n");
//   delay(500);  // Give the server some time to respond
//   while (client.available()) {
//     String line = client.readStringUntil('\r');
//     Serial.print(line);
//   }
//   Serial.println();
//   Serial.println("Closing connection");
//   client.stop();
// }

void sendData(float temperature, float humidity, float light, float EC, float PH, float time) {
  delay(5000);
  // Create the request URL with sensor data as parameters
  String url = "/testSend/combinesent.php";
  url += "?temperature=";
  url += temperature;
  url += "&humidity=";
  url += humidity;
  url += "&light=";
  url += light;
  url += "&EC=";
  url += EC;
  url += "&ph_value=";
  url += PH;
  url += "&time_duration=";
  url += time;
  WiFiClient client;
  if (!client.connect(host, httpPort)) {
    Serial.println("Connection failed");
    return;
  }
  Serial.println("Sending data to server");
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "Connection: close\r\n\r\n");
  delay(500);  // Give the server some time to respond
  while (client.available()) {
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }
  Serial.println();
  Serial.println("Closing connection");
  client.stop();
}

double* getData(String url ){
  delay(5000);
  HTTPClient http;
  http.begin(host, httpPort, url);
  int httpCodeGet = http.GET();
  if (httpCodeGet == HTTP_CODE_OK) {
    String payloadGet = http.getString();
    http.end();
    double* data = new double[8]; // Array to store the fetched data
    int index = 0;
    String value;
    for (int i = 0; i < payloadGet.length(); i++) {
      if (payloadGet[i] == ',') {
        data[index++] = value.toDouble();
        value = ""; // Clear the value string
      } else {
        value += payloadGet[i];
      }
    }
    data[index] = value.toDouble(); // Get the last value
    return data;
  } else {
    Serial.println("HTTP GET request failed");
    http.end();
    return NULL;
  }
}

void getWatertemp(){
  delay(500);
  Vo = analogRead(ThermistorPin);
  R2 = R1 * (4096.0 / (float)Vo - 1.0);
  logR2 = log(R2);
  T = (1.0 / (c1 + c2*logR2 + c3*logR2*logR2*logR2));
  Tc = T - 273.15;
  Tf = (Tc * 9.0)/ 5.0 + 32.0; 
  waterTemp = Tc;
  // Serial.print("Temperature: "); 
  // Serial.print(Tf);
  // Serial.print(" F; ");
  // Serial.print(Tc);
  // Serial.println(" C");
}

float getLocalTime(){
  delay(5000);
  HTTPClient http;
  String url = "/api/timezone/" + String(timezone);
  http.begin(hostAPI, 80, url);
  int httpCode = http.GET();
  if (httpCode == HTTP_CODE_OK) {
    String payload = http.getString();
    http.end();
    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, payload);
    if (!error) {
      const char* datetime = doc["datetime"];
      int hours = String(datetime).substring(11, 13).toInt(); // Extract hours
      int minutes = String(datetime).substring(14, 16).toInt(); // Extract minutes
      return hours + (minutes / 60.0); // Return time in decimal format
    } else {
      Serial.println("Failed to parse JSON");
    }
  } else {
    Serial.println("HTTP GET request failed");
  }
  return -1.0; // Return -1.0 if unable to fetch time
}

void getDatabaseData(){
  relays::currentTime = getLocalTime();
  double* relayData = getData("http://192.168.100.15/testSend/tempMin.php");
  if(relayData != NULL){
    relays::temp_min = relayData[0];
    relays::temp_max = relayData[1];
    relays::time_duration = relayData[2];
    relays::ph_min = relayData[3];
    relays::ph_max = relayData[4];
    relays::ec_min = relayData[5];
    relays::ec_max = relayData[6];
    relays::setTime = relayData[7];
  }
  else{
    delete[] relayData;
  }
  Serial.println(relays::temp_min);
  Serial.println(relays::temp_max);
  Serial.println(relays::time_duration);
  Serial.println(relays::ph_min);
  Serial.println(relays::ph_max);
  Serial.println(relays::ec_min);
  Serial.println(relays::ec_max);
  Serial.println(relays::currentTime);
  Serial.println(relays::setTime);
  Serial.println(relays::sendLight);
}

void relayControls(){
    // Light Relay Condition
    if (relays::currentTime >= relays::setTime && relays::time_duration != 0 && relays::runningSeconds < relays::time_duration) {
      // Turn on grow lights
      digitalWrite(relays::growLights, HIGH);
    }
    else{
      digitalWrite(relays::growLights, LOW);
    }
    //Temperature Relay Condition
    if (temperature >= (relays::temp_min + relays::temp_max)/2 && relays::temp_min != NULL && relays::temp_max != NULL){
      digitalWrite(relays::fans, HIGH);
    }
    else{
      digitalWrite(relays::fans, LOW);
    }

    //EC Nutrient Solution Condition
    if (sensor::ec < (relays::ec_min + relays::ec_max)/2){
      digitalWrite(relays::solutionA, HIGH);
      digitalWrite(relays::solutionB, HIGH);
      delay(1000);
      digitalWrite(relays::solutionA, LOW);
      digitalWrite(relays::solutionB, LOW);
    }
    else if (sensor::ec > relays::ec_max){
      digitalWrite(relays::waterPump, HIGH);
      delay(1000);
      digitalWrite(relays::waterPump, LOW);
    }
    else{
      if (ph_act < (relays::ph_min + relays::ph_max)/2){
        digitalWrite(relays::solutionUp, HIGH);
        delay(1000);
        digitalWrite(relays::solutionUp, LOW);
      }
      else if(ph_act >= (relays::ph_min + relays::ph_max)*(3/4)){
        digitalWrite(relays::solutionDown, HIGH);
        delay(1000);
        digitalWrite(relays::solutionDown, LOW);
      }
    }
}

void backUptime(){
  if (relays::setTime <= relays::currentTime ){
    relays::runningSeconds += 10; // Increment running seconds by 5 seconds
    if (millis() - relays::lastMillis >= 10000) {  // Check if 10 minutes have passed (600000 milliseconds = 10 minutes)
        // Store the running seconds to a variable or EEPROM
        Serial.print("Running Seconds: ");
        Serial.println(relays::runningSeconds);
        relays::sendLight = relays::time_duration - relays::runningSeconds;
        relays::lastMillis = millis();  // Update the last time the seconds were stored
    }
  }
  else{
    relays::runningSeconds = 0;
  }
}

void getPH(){
  for (int i = 0; i < 10; i++) { 
    buffer_arr[i] = analogRead(A1);
    delay(30);
  }
  
  for (int i = 0; i < 9; i++) {
    for (int j = i + 1; j < 10; j++) {
      if (buffer_arr[i] > buffer_arr[j]) {
        temp = buffer_arr[i];
        buffer_arr[i] = buffer_arr[j];
        buffer_arr[j] = temp;
      }
    }
  }
  
  avgval = 0;
  for (int i = 2; i < 8; i++)
    avgval += buffer_arr[i];
    
  float volt = (float)avgval * 3.16 / 4096.0 / 6; 
  ph_act = -5.70 * volt + calibration_value;
  
  Serial.print("pH Value: ");
  Serial.println(ph_act);
  // String url = "/testSend/phData.php?ph=" + String(ph_act);
  // sendData(url);
}




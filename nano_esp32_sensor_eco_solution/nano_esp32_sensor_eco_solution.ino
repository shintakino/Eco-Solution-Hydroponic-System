#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <DHT.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2561_U.h>
#include <Wire.h>
#include <BH1750.h>
#include <RTClib.h>
#define DHTPIN 9      // Pin connected to the DHT sensor
#define DHTTYPE DHT22  // DHT 22 (AM2302) sensor type
DHT dht(DHTPIN, DHTTYPE);
// Light Sensor Declation
RTC_DS1307 rtc;
BH1750 lightMeter;
#define TSL2561_ADDR (0x39) 
Adafruit_TSL2561_Unified tsl = Adafruit_TSL2561_Unified(TSL2561_ADDR, 12345);
float light;
BLEServer* pServer = NULL;
BLECharacteristic* pCharacteristic = NULL;
bool deviceConnected = false;
bool oldDeviceConnected = false;
float temperature;
float humidity;

//Water Temp Declaration
int ThermistorPin = A0;
int Vo;
float R1 = 10000;
float logR2, R2, T, Tc, Tf;
float c1 = 1.009249522e-03, c2 = 2.378405444e-04, c3 = 2.019202697e-07;


//TDS Sensor Declaration
namespace pin {
  const byte tds_sensor = A2;
}
namespace device {
  float aref = 3.232;
}
namespace sensor {
  float ecStable = 0;
  float ec = 0;
  unsigned int tds = 0;
  float ecCalibration = 1;
  float rawEc;
  float waterTemp; // Constant temperature set to 25°C
}
// EC isolator
int EC_Isolator = 12; // x PNP TYPE TRANSISTOR THIS is used to connect and disconnect the 3.3V wire 
int EC_GND_Wire = 11; // 2N2222 NPN TRANSISTOR THIS IS USED TO CONNECT AND DISCONNECT THE GND WIRE

//Ph Declaration
float calibration_value = 21.34 + 0.03;
unsigned long int avgval; 
int buffer_arr[10], temp;
float ph_act;
int pH_Value; 
float Voltage;

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

// Wifi declaration
const char* ssid = "TV";     // Narvaza WiFi_ZH-Konek Shintakino
const char* password = "ArvinLicatan22"; //@narvaza2023 itz_me_josh

const char* host = "192.168.1.108";  // Destination server IP 192.168.100.15 192.168.254.116 192.168.1.108
const char* hostAPI = "worldtimeapi.org";
const char* timezone = "Asia/Manila";
const char* apiURL = "https://worldtimeapi.org/api/timezone/Asia/Manila";
const int httpPort = 80;               // HTTP port
int programRunCount = 1;
  

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    }
};

void setup() {
  Serial.begin(115200);
  BLEDevice::init("ESP32");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  BLEService *pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_WRITE  |
                      BLECharacteristic::PROPERTY_NOTIFY |
                      BLECharacteristic::PROPERTY_INDICATE
                    );
  pCharacteristic->addDescriptor(new BLE2902());
  pService->start();
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(false);
  pAdvertising->setMinPreferred(0x0);
  BLEDevice::startAdvertising();
  Serial.println("Waiting for a client connection...");
  // Initialize RTC
  if (!rtc.begin()) {
    Serial.println("Couldn't find RTC");
    while (1);
  }
  Wire.begin();
  lightMeter.begin();
  dht.begin();
  pinMode(pH_Value, INPUT); 
  pinMode(sensor::rawEc, INPUT);
  pinMode(relays::fans, OUTPUT);
  pinMode(relays::waterPump, OUTPUT);
  pinMode(relays::solutionA, OUTPUT);
  pinMode(relays::solutionB, OUTPUT);
  pinMode(relays::solutionUp, OUTPUT);
  pinMode(relays::solutionDown, OUTPUT);
  pinMode(relays::growLights, OUTPUT);
  pinMode(relays::waterPumpMain, OUTPUT);
  pinMode(EC_Isolator, OUTPUT);
  pinMode(EC_GND_Wire, OUTPUT);
  digitalWrite(relays::fans, HIGH);
  digitalWrite(relays::waterPump, HIGH);
  digitalWrite(relays::solutionA, HIGH);
  digitalWrite(relays::solutionB, HIGH);
  digitalWrite(relays::solutionUp, HIGH);
  digitalWrite(relays::solutionDown, HIGH);
  digitalWrite(relays::growLights, HIGH);
  digitalWrite(relays::waterPumpMain, HIGH);
  digitalWrite(EC_Isolator, HIGH);
  digitalWrite(EC_GND_Wire, LOW); 

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
  // Fetch time from World Time API
  String datetime = getTimeFromAPI();
  // Set DS1307 RTC with obtained time
  setRTC(datetime);
  Serial.println("Time set successfully!");
  // Print current time from RTC
  printRTC();
}

void loop() {
    if (deviceConnected) {
        // calibrate(); // Read temperature from DHT sensor
        // getDatabaseData();
        // getWatertemp();
        // getTds();
        // getLight();
        // getTemp();
        // relayDosingEC();
        // runRelayTemperature();
        // relayLight();
        // postSensors();
        // backUptime();
        setValueWithUnit(pCharacteristic, temperature, " C");
        delay(1000);
        setValueWithUnit(pCharacteristic, sensor::ec, " EC");
        delay(1000);
    //     // setValueWithUnit(pCharacteristic, ph_act, " pH");
    //     // delay(1000);
    //     // setValueWithUnit(pCharacteristic, Voltage, " V");
    //     // delay(1000);
    //     // setValueWithUnit(pCharacteristic, light, " lux");
    //     // delay(1000);
    }
    if (!deviceConnected && oldDeviceConnected) {
        delay(500);
        pServer->startAdvertising();
        Serial.println("Restarting advertising");
        oldDeviceConnected = deviceConnected;
    }
    if (deviceConnected && !oldDeviceConnected) {
        oldDeviceConnected = deviceConnected;
    }
  // if (programRunCount == 1) {
  //   digitalWrite(relays::growLights, HIGH);
  //   digitalWrite(relays::growLights, LOW);
  //   delay(2400000);
  //   for (int i = 0 ; i < 100; i++){
  //     getLight();
  //     delay(1000);
  //   }
  //   String url = "/testSend/tsl2561Settings.php?lux_settings=" + String(light);
  //   sendTSLUXSetting(url);
  //   delay(10000);
  //   programRunCount++;
  // }
  // else {
  //   if (programRunCount > 1){
  //     getDatabaseData();
  //     getWatertemp();
  //     getTds();
  //     getLight();
  //     getTemp();
  //     relayDosingEC();
  //     runRelayTemperature();
  //     relayLight();
  //     backUptime();
  //     postSensors();
  //   }
  // }
      getDatabaseData();
      getWatertemp();
      getTds();
      getLight();
      getTemp();
      relayDosingEC();
      runRelayTemperature();
      relayLight();
      backUptime();
      postSensors();
}
void relayDosingPH(){
      if (ph_act < relays::ph_min && ph_act < relays::ph_max && ph_act != NULL && relays::ph_min != NULL && relays::ph_max != NULL){
        digitalWrite(relays::solutionUp, LOW);
        Serial.println("Applying Ph Up");
        delay(1000);
        digitalWrite(relays::solutionUp, HIGH);
        delay(1000);
        Serial.println("OFF Ph Up");
      }
      else if(ph_act > relays::ph_max && ph_act > relays::ph_min && ph_act != NULL && relays::ph_min != NULL && relays::ph_max != NULL){
        digitalWrite(relays::solutionDown, LOW);
        Serial.println("Applying Ph Down");
        delay(1000);
        digitalWrite(relays::solutionDown, HIGH);
        delay(1000);
        Serial.println("OFF Ph Down");
      }
      else if(ph_act <= relays::ph_max && ph_act >= relays::ph_min && ph_act != NULL && relays::ph_min != NULL && relays::ph_max != NULL){
        digitalWrite(relays::solutionUp, HIGH);
        digitalWrite(relays::solutionDown, HIGH);
        Serial.println("Ph Dosing OFF");
      }
}
void relayDosingEC(){
  //EC Nutrient Solution Condition
    if (sensor::ec < relays::ec_min && sensor::ec < relays::ec_max && sensor::ec != NULL && relays::ec_min != NULL && sensor::ec != NULL && relays::ec_min != NULL && relays::ec_max != NULL){
      digitalWrite(relays::solutionA, LOW);
      digitalWrite(relays::solutionB, LOW);
      Serial.println("ON A and B");
      delay(1000);
      digitalWrite(relays::solutionA, HIGH);
      digitalWrite(relays::solutionB, HIGH);
      delay(1000);
      Serial.println("OFF A and B");
    }
    else if (sensor::ec > relays::ec_max && sensor::ec > relays::ec_min && sensor::ec != NULL && relays::ec_min != NULL && sensor::ec != NULL && relays::ec_min != NULL && relays::ec_max != NULL){
      // digitalWrite(relays::waterPump, LOW);
      // Serial.println("ON Water");
      // delay(1000);
      // digitalWrite(relays::waterPump, HIGH);
      // delay(1000);
      // Serial.println("OFF Water");
      digitalWrite(relays::solutionA, HIGH);
      digitalWrite(relays::solutionB, HIGH);
      digitalWrite(relays::waterPump, HIGH);
      relayDosingPH();
    }
    else if (sensor::ec >= relays::ec_min && sensor::ec <= relays::ec_max && sensor::ec != NULL && relays::ec_min != NULL && sensor::ec != NULL && relays::ec_min != NULL && relays::ec_max != NULL){
      digitalWrite(relays::solutionA, HIGH);
      digitalWrite(relays::solutionB, HIGH);
      digitalWrite(relays::waterPump, HIGH);
      Serial.println("OFF Dosing");
      relayDosingPH();
    }
}
void runRelayTemperature(){
  if (temperature >= relays::temp_max && relays::temp_min != NULL && relays::temp_max != NULL){
      digitalWrite(relays::fans, LOW);
      Serial.println("Fans ON");
    }
  else{
      digitalWrite(relays::fans, HIGH);
      Serial.println("Fans OFF");
    }
}
void relayLight(){
    // Light Relay Condition
    if (relays::currentTime >= relays::setTime && relays::time_duration != 0 && relays::runningSeconds <= relays::time_duration && relays::currentTime!= -1.0) {
      // Turn on grow lights
      digitalWrite(relays::growLights, LOW);
      Serial.println("Grow Lights ON");
    }
    else{
      digitalWrite(relays::growLights, HIGH);
      Serial.println("Grow Lights OFF");
    }
    // runPump();
}

void runPump(){
  Serial.println("Main Pump ON");
  digitalWrite(relays::waterPumpMain, LOW);
  delay(30000);
  digitalWrite(relays::waterPumpMain, HIGH);
  Serial.println("Main Pump OFF");
  delay(10000);
  
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
  } else {
    Serial.println("Error reading light sensor");
  }
  // light = lightMeter.readLightLevel();
  // Serial.print("Light: ");
  // Serial.print(light);
  // Serial.println(" lux");
}

void getWatertemp(){
  Vo = analogRead(ThermistorPin);
  R2 = R1 * (4096.0 / (float)Vo - 1.0);
  logR2 = log(R2);
  T = (1.0 / (c1 + c2*logR2 + c3*logR2*logR2*logR2));
  Tc = (T - 273.15)-2;
  Tf = (Tc * 9.0)/ 5.0 + 32.0; 
  sensor::waterTemp = Tc;
  Serial.print("Temperature: "); 
  Serial.print(Tf);
  Serial.print(" F; ");
  Serial.print(Tc);
  Serial.println(" C");
}

void getTds(){
  digitalWrite(EC_Isolator, HIGH);
  digitalWrite(EC_GND_Wire, LOW); 
  getPH();
  digitalWrite(EC_Isolator, LOW);
  digitalWrite(EC_GND_Wire, HIGH); 
  delay(1000);
  float rawEc = analogRead(pin::tds_sensor) * device::aref / 4096.0; // read the analog value more stable by the median filtering algorithm, and convert to voltage value
  float temperatureCoefficient = 1.0 + 0.02 * (sensor::waterTemp - 25.0); // temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0));
  sensor::ec = (rawEc / temperatureCoefficient) * sensor::ecCalibration; // temperature and calibration compensation
  sensor::tds = (133.42 * sensor::ec - 255.86 * sensor::ec * sensor::ec + 857.39 * sensor::ec) * 0.5; //convert voltage value to tds value
  Serial.print(F("TDS:")); Serial.println(sensor::tds);
  Serial.print(F("EC:")); Serial.println(sensor::ec);
  Serial.print(F("Temperature:")); Serial.println(sensor::waterTemp,2);
  delay(1000);
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
    
  float volt = (float)avgval * 3.256 / 4096.0 / 6; 
  ph_act = -5.70 * volt + calibration_value;
  
  Serial.print("pH Value: ");
  Serial.println(ph_act);
  // String url = "/testSend/phData.php?ph=" + String(ph_act);
  // sendData(url);
}

//BlueTooth Debugging
void setValueWithUnit(BLECharacteristic* characteristic, float value, const char* unit) {
    // Convert value to a string
    char valueStr[10]; // Make sure the buffer is large enough
    dtostrf(value, 4, 2, valueStr); // Convert float to string
    
    // Concatenate the unit string to the value string
    char resultStr[50]; // Make sure the buffer is large enough
    snprintf(resultStr, sizeof(resultStr), "%s %s", valueStr, unit);
    
    // Set the value of the characteristic
    characteristic->setValue(resultStr);
    characteristic->notify();
}
// PH Callibrator
void calibrate(){
  pH_Value = analogRead(A1); 
  Voltage = pH_Value * (3.256 / 4096.0); 
  Serial.println(Voltage); 
  delay(500); 
}
//Test Relay
void testRelay(){
      digitalWrite(relays::fans, HIGH);
      digitalWrite(relays::waterPump, HIGH);
      digitalWrite(relays::solutionA, HIGH);
      digitalWrite(relays::solutionB, HIGH);
      digitalWrite(relays::solutionUp, HIGH);
      digitalWrite(relays::solutionDown, HIGH);
      digitalWrite(relays::growLights, HIGH);
      digitalWrite(relays::waterPumpMain, HIGH);  
      delay(1000);
      digitalWrite(relays::fans, LOW);
      digitalWrite(relays::waterPump, LOW);
      digitalWrite(relays::solutionA, LOW);
      digitalWrite(relays::solutionB, LOW);
      digitalWrite(relays::solutionUp, LOW);
      digitalWrite(relays::solutionDown, LOW);
      digitalWrite(relays::growLights, LOW);
      digitalWrite(relays::waterPumpMain, LOW);  
      delay(3000);
}
// Get All Data from the Database
void getDatabaseData(){
  relays::currentTime = getTimeLocal();
  double* relayData = getData("http://192.168.1.108/testSend/tempMin.php");
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
// Send Light Data For the First Initialization
void sendTSLUXSetting(String url){
   delay(5000);
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
// Get Time from API
String getTimeFromAPI() {
  HTTPClient http;

  // Make HTTP GET request
  http.begin(apiURL);
  int httpResponseCode = http.GET();

  String datetime = ""; // Default empty datetime
  
  if (httpResponseCode > 0) {
    if (httpResponseCode == HTTP_CODE_OK) {
      datetime = http.getString();
      // Extract datetime string directly from API response
      int datetimeIndex = datetime.indexOf("datetime") + 11; // Index of the start of the datetime string
      datetime = datetime.substring(datetimeIndex, datetimeIndex + 19); // Extract datetime string (YYYY-MM-DDTHH:MM:SS)
    }
  }
  else {
    Serial.printf("HTTP GET request failed, error: %s\n", http.errorToString(httpResponseCode).c_str());
  }

  http.end();
  return datetime;
}
//Function to Convert to decimal format from RTC
float getTimeLocal() {
  DateTime now = rtc.now();
  float hours = now.hour();
  float minutes = now.minute();
  return hours + (minutes / 60.0);
}
// Setting RTC from The data Recieve from API
void setRTC(String datetime) {
  // Parse datetime string to extract time and date
  int year, month, day, hour, minute, second;
  sscanf(datetime.c_str(), "%d-%d-%dT%d:%d:%d", &year, &month, &day, &hour, &minute, &second);

  // Set DS1307 RTC with obtained time
  DateTime dt(year, month, day, hour, minute, second);
  rtc.adjust(dt);
}

//Print RTC in SetUp
void printRTC() {
  // Get the current time from the RTC
  DateTime now = rtc.now();
  // Print the time
  Serial.print("Current RTC Time: ");
  Serial.print(now.year());
  Serial.print("-");
  printDigits(now.month());
  Serial.print("-");
  printDigits(now.day());
  Serial.print(" ");
  printDigits(now.hour()); // Print hours in 24-hour format
  Serial.print(":");
  printDigits(now.minute());
  Serial.print(":");
  printDigits(now.second());
  Serial.println();
}
void printDigits(int digits) {
  // Helper function to print leading zero
  if (digits < 10) {
    Serial.print("0");
  }
  Serial.print(digits);
}
// Get Data Settings and Store to Array
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
// Send Data all at once Function
void sendData(float temperature1, float humidity1, float light1, float EC1, float PH1, float time1) {
  delay(5000);
  // Create the request URL with sensor data as parameters
  String url = "/testSend/combinesent.php";
  url += "?temperature=";
  url += temperature1;
  url += "&humidity=";
  url += humidity1;
  url += "&light=";
  url += light1;
  url += "&EC=";
  url += EC1;
  url += "&ph_value=";
  url += PH1;
  url += "&time_duration=";
  url += time1;
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
// Reference Time Point to Run the Growlights for specific period of time
void backUptime(){
  if (relays::setTime <= relays::currentTime ){
    relays::runningSeconds += 10; // Increment running seconds by 5 seconds
    if (millis() - relays::lastMillis >= 60000) {  // Check if 10 minutes have passed (600000 milliseconds = 10 minutes)
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
//Update Data post Entry Serve as A backUp time
void postSensors(){
  if (relays::sendLight > 0){
  sendData(temperature, humidity, light , sensor::ec, ph_act, relays::sendLight);
  }
  else if (relays::time_duration > 0){
    sendData(temperature, humidity, light , sensor::ec, ph_act, relays::time_duration);
  }
}
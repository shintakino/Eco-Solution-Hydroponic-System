# 🌱 Eco-Solution Hydroponic System

<div align="center">

![Project Cover](public/images/Image%204.jpg)

![Arduino](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge\&logo=Arduino\&logoColor=white)
![ESP32](https://img.shields.io/badge/ESP32-E7352C?style=for-the-badge\&logo=espressif\&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge\&logo=php\&logoColor=white)
![IoT](https://img.shields.io/badge/IoT-4285F4?style=for-the-badge\&logo=google-cloud\&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

**A local IoT automation system for hydroponics using React, PHP (XAMPP), and Arduino Nano ESP32.**
*Monitor, control, and optimize your hydroponic environment with precision.*

[🚀 Getting Started](#-getting-started) • [📊 System Overview](#-system-overview) • [🛠️ Technologies](#️-technologies-used) • [📁 Project Structure](#-project-structure) • [📷 Screenshots](#-screenshots) • [🤝 Contributing](#-contributing)

</div>

---

## 📊 System Overview

Eco-Solution Hydroponic System integrates **IoT hardware** with a **modern web dashboard** to provide full local control over hydroponic setups—no cloud required.

* 🌿 **Frontend** – React-based dashboard with responsive UI
* 🔧 **Backend** – PHP on XAMPP for API endpoints, data processing, and database access
* ⚡ **Microcontroller** – Arduino Nano **ESP32** for sensor reads & actuator control
* 💾 **Database** – SQL (MySQL/MariaDB) for readings, settings, and logs

### 🎯 Key Features

* **Real-time Monitoring**: Temperature, humidity, pH, light (TSL2561), EC, water level
* **Automated Control**: Fans, lights, pumps, dosing pumps, relays
* **Data Visualization**: Historical charts (Chart.js), trend insights
* **User Auth**: Email-based signup/login
* **Custom Thresholds**: Adjustable ranges & schedules
* **Fully Local**: LAN-only communication for privacy and reliability

---

## 🛠️ Technologies Used

<div align="center">

### 🌿 Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square\&logo=react\&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square\&logo=tailwind-css\&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat-square\&logo=chart.js\&logoColor=white)

### 🔧 Backend

![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat-square\&logo=php\&logoColor=white)
![XAMPP](https://img.shields.io/badge/XAMPP-FB7A24?style=flat-square\&logo=xampp\&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-4479A1?style=flat-square\&logo=mysql\&logoColor=white)

### ⚡ Hardware

![Arduino Nano ESP32](https://img.shields.io/badge/Arduino_Nano_ESP32-00979D?style=flat-square\&logo=arduino\&logoColor=white)
![DHT11](https://img.shields.io/badge/DHT11-FF6B6B?style=flat-square)
![TSL2561](https://img.shields.io/badge/TSL2561-4ECDC4?style=flat-square)
![pH Sensor](https://img.shields.io/badge/pH_Sensor-45B7D1?style=flat-square)
![EC Sensor](https://img.shields.io/badge/EC_Sensor-96CEB4?style=flat-square)

### 📡 Communication

![HTTP Client](https://img.shields.io/badge/HTTP_Client-00599C?style=flat-square)
![I2C](https://img.shields.io/badge/I2C-000000?style=flat-square)
![WiFi](https://img.shields.io/badge/WiFi-4285F4?style=flat-square)

</div>

---

## 🧩 Architecture (High Level)

```
[Sensors] ──> ESP32 (Arduino Nano) ──HTTP──> PHP API (XAMPP) ──SQL──> Database
   ▲                 │                                 │
   └─────────────────┴──────────── Web UI (React) <────┘
```

**Sensors:** temperature, humidity (DHT11), light (TSL2561), pH, EC, water level
**Actuators:** relays, fans, lights, pumps, dosing pumps

---

## 📁 Project Structure

```
Eco-Solution-Hydroponic-System/
├── 📋 README.md
├── 📄 LICENSE
├── ⚙️ jsconfig.json
├── 📦 package.json
├── 🎨 tailwind.config.js
├── 📊 postcss.config.js
├── 🔧 .prettierrc
├── 📝 .prettierignore
├── public/
│   └── images/
│       └── Image 4.jpg            # cover image
├── dashboard_pages/               # screenshots used in README
│   ├── signup_login.jpg
│   ├── mainDashboard1.1.jpg
│   ├── mainDashboard1.2.jpg
│   ├── mainDashboard1.3.jpg
│   ├── vpd.jpg
│   ├── dli.jpg
│   ├── plant_parameter.jpg
│   ├── dataVisualization1.1.jpg
│   ├── dataVisualization1.2.jpg
│   └── current_setting.jpg
├── Libraries/                     # Arduino libraries
│   ├── Adafruit_TSL2561/
│   ├── ArduinoHttpClient/
│   ├── DHT_sensor_library/
│   └── Wire/
├── ⚡ nano_esp32_sensor_eco_solution/
│   └── nano_esp32_sensor_eco_solution.ino
├── 🌐 phpScripts/                  # PHP backend scripts (30+)
│   ├── login.php
│   ├── dht11.php
│   ├── get_latest_temperature.php
│   ├── save_light_settings.php
│   └── ... more endpoints
├── 🖥️ public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── 🎭 src/
    ├── App.jsx
    ├── index.jsx
    ├── Routes.jsx
    ├── assets/
    ├── components/
    ├── pages/
    │   ├── Home.jsx
    │   ├── DESKTOPMAINDASHBOARD/
    │   ├── LightLevelControl/
    │   ├── NutrientControl/
    │   ├── SensorDataGraph/
    │   ├── SignUP/
    │   └── TempControl/
    └── styles/
```

---

## 🚀 Getting Started

### 📋 Prerequisites

* **Node.js** v14+ and **npm**
* **Arduino IDE** v2.0+
* **XAMPP** (Apache + MySQL)
* Basic knowledge of React, PHP, Arduino, and hydroponics

### 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/shintakino/Eco-Solution-Hydroponic-System.git
   cd Eco-Solution-Hydroponic-System
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Configure the backend**

   * Install **XAMPP** and start **Apache** & **MySQL**
   * Create a database and import your SQL schema
   * Copy `phpScripts/` to `XAMPP/htdocs/eco-solution/` (or your chosen folder)
   * Update any DB credentials inside the PHP files as needed

4. **Upload the Arduino sketch**

   * Open `nano_esp32_sensor_eco_solution/nano_esp32_sensor_eco_solution.ino`
   * Install required libraries: **Adafruit\_TSL2561**, **ArduinoHttpClient**, **DHT\_sensor\_library**, **Wire**
   * Update Wi-Fi SSID/PASS and **backend IP/URL** for your LAN
   * Upload to **Arduino Nano ESP32**

5. **Wire the hardware**

   * Connect sensors (DHT11, TSL2561, pH, EC, ultrasonic)
   * Connect actuators (relays, pumps, dosing pumps, fans, lights)
   * Verify voltage levels and grounds are common

### 🏃 Run the System

* **Frontend**

  ```bash
  npm start
  ```

  Open: `http://localhost:3000`

* **Backend**

  * Ensure **Apache** & **MySQL** are running in XAMPP
  * Access PHP endpoints via `http://<your-xampp-ip>/eco-solution/phpScripts/...`

* **Device**

  * Power the **ESP32**; it will connect to Wi-Fi and start sending/receiving data

---

## 🔧 Configuration Snippets

**Frontend environment (optional):** create `.env`

```bash
VITE_API_BASE=http://192.168.1.10/eco-solution/phpScripts
```

**Example PHP DB connection (`phpScripts/_db.php`):**

```php
<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "eco_solution";
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) { http_response_code(500); die("DB connect failed"); }
header('Content-Type: application/json');
?>
```

**Example API route (`phpScripts/get_latest_temperature.php`):**

```php
<?php
require_once "_db.php";
$q = $conn->query("SELECT value, created_at FROM sensor_readings WHERE type='temperature' ORDER BY created_at DESC LIMIT 1");
echo json_encode($q->fetch_assoc() ?: ["value"=>null, "created_at"=>null]);
```

**ESP32 HTTP post (excerpt from `.ino`):**

```cpp
#include <WiFi.h>
#include <ArduinoHttpClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* pass = "YOUR_WIFI_PASS";
const char* serverAddress = "192.168.1.10"; // XAMPP machine
int port = 80;

WiFiClient wifi;
HttpClient client = HttpClient(wifi, serverAddress, port);

void sendTemp(float t) {
  String path = "/eco-solution/phpScripts/ingest.php";
  String body = "type=temperature&value=" + String(t);
  client.beginRequest();
  client.post(path);
  client.sendHeader("Content-Type","application/x-www-form-urlencoded");
  client.sendHeader("Content-Length", body.length());
  client.beginBody();
  client.print(body);
  client.endRequest();
}
```

> ⚠️ Replace IPs, credentials, and paths with your actual local network setup.

---

## 🎮 System Usage

### 🔐 Authentication

* Signup/login via email & password
* Sessions for secure access to controls

### 📊 Dashboard

* Live readings: temperature, humidity, pH, EC, light, water level
* Status indicators & quick actions
* Links to parameter settings and charts

### ⚙️ Settings

* Temperature & humidity ranges
* pH & EC thresholds
* Light cycle timings & intensity
* Watering schedules (frequency & duration)

### 📈 Analytics

* Historical charts for all parameters
* Compare periods & parameters
* Export insights (manual or planned automation)

---

## 🧪 Sensors & Actuators

| Type      | Components                                                               |
| --------- | ------------------------------------------------------------------------ |
| Sensors   | DHT11 (Temp/Humidity), TSL2561 (Light), pH Sensor, EC Sensor, Ultrasonic |
| Actuators | Relays, Dosing Pumps, Water Pumps, Fans, LED Grow Lights                 |

---

## 📷 Screenshots

**Signup / Login**
![Signup / Login](dashboard_pages/signup_login.jpg)

**Dashboard**
![Dashboard Upper](dashboard_pages/mainDashboard1.1.jpg)
![Dashboard Middle](dashboard_pages/mainDashboard1.2.jpg)
![Dashboard Lower](dashboard_pages/mainDashboard1.3.jpg)

**Parameter Settings**
![VPD Settings](dashboard_pages/vpd.jpg)
![DLI Settings](dashboard_pages/dli.jpg)
![Nutrient Settings](dashboard_pages/dataVisualization1.2.jpg)

**Visualization**
![Parameter Presets](dashboard_pages/plant_parameter.jpg)
![Visualize Light & VPD](dashboard_pages/dataVisualization1.1.jpg)
![Current Parameter Settings](dashboard_pages/current_setting.jpg)

> If image paths include spaces (e.g., `public/images/Image 4.jpg`), keep them exactly as shown or wrap in angle brackets: `![Alt](<public/images/Image 4.jpg>)`.

---

## 🚀 Future Enhancements

* 🌐 Web deployment for secure remote access
* 🤖 ML-based optimization (predictive control, yield insights)
* ⚙️ PID / fuzzy logic for precise regulation
* 🧩 Multi-zone control for larger grows
* ⚡ Energy-aware scheduling
* 📝 Automated PDF/CSV reporting

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m "Add amazing feature"`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

Issues and feature requests are welcome!

---

## 📜 License

Licensed under the **MIT License** – see [LICENSE](LICENSE).

---

## 👨‍💻 About the Author

<div align="center">

### **Shintakino**

*IoT Developer • Hydroponics Enthusiast • Open Source Contributor*

[![GitHub](https://img.shields.io/badge/GitHub-@shintakino-181717?style=for-the-badge\&logo=github\&logoColor=white)](https://github.com/shintakino)

*"Building sustainable growing solutions through technology and innovation."*

</div>

---

<div align="center">

## 🌟 Support the Project

[![Star](https://img.shields.io/badge/⭐-Star-yellow?style=for-the-badge)](https://github.com/shintakino/Eco-Solution-Hydroponic-System)
[![Fork](https://img.shields.io/badge/🍴-Fork-blue?style=for-the-badge)](https://github.com/shintakino/Eco-Solution-Hydroponic-System/fork)
[![Share](https://img.shields.io/badge/📢-Share-green?style=for-the-badge)](https://github.com/shintakino/Eco-Solution-Hydroponic-System)

**Happy Growing! 🌱**

</div>

---


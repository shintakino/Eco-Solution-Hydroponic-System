import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Heading, Img } from "../../components";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';

export default function DesktopMainDashboardPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [lux, setLux] = useState("");

  const fetchTemperature = () => {
    fetch('http://192.168.100.15/testSend/get_latest_temperature.php')
      .then(response => response.json())
      .then(data => {
        setTemperature(data.temperature);
      })
      .catch(error => console.error('Error fetching temperature:', error));
  };

  const fetchHumidity = () => {
    fetch('http://192.168.100.15/testSend/get_latest_humidity.php', {
      method: 'GET',
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      setHumidity(data.humidity);
    })
    .catch(error => console.error('Error fetching humidity:', error));
  };

  const fetchLux = () => {
    fetch('http://192.168.100.15/testSend/get_latest_lux.php',{
      method: 'GET',
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      setLux(data.light);
    })
    .catch(error => console.error('Error fetching lux:', error));
  };

  useEffect(() => {
    // Fetch data initially
    fetchTemperature();
    fetchHumidity();
    fetchLux();

    // Set up interval for data refresh (every 5 seconds in this example)
    const interval = setInterval(() => {
      fetchTemperature();
      fetchHumidity();
      fetchLux();
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="w-full p-5 bg-gray-900">
        <div className="flex flex-col items-center mt-2 mb-8">
          <Heading size="3xl" as="h1" className="text-center text-gray-100 text-shadow-ts mb-8">
            Welcome, {user ? user : "Guest"} - Hydroponic System Dashboard
          </Heading>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard title="Temperature" value={temperature ? `${temperature}°C` : "Loading..."} icon="img_arrow_up.svg" />
            <DashboardCard title="pH/EC" value="6.5 / 1.2 mS/cm" icon="img_edit.svg" />
            <DashboardCard title="Humidity" value={humidity ? `${humidity}%` : "Loading..."} icon="img_fire.svg" />
            <DashboardCard title="Light Level" value={lux ? `${lux} Lux` : "Loading..."} icon="img_search.svg" />
          </div>
          <div className="flex flex-col items-center mt-8">
            <Img src="images/img_search_indigo_a200.svg" alt="search_icon" className="h-16 w-16 mb-3" />
            <Heading size="md" as="h2" className="text-blue_gray-300">
              Automation Settings
            </Heading>
          </div>
          <div className="flex flex-col items-center mt-8">
            <Button color="blue_A200" size="lg" shape="round" className="w-full mb-4" onClick={() => navigate("/tempcontrol")}>
              Temperature Control
            </Button>
            <Button color="green_A700" size="lg" shape="round" className="w-full mb-4" onClick={() => navigate("/nutrientcontrol")}>
              Nutrient Control
            </Button>
            <Button color="amber_600" size="lg" shape="round" className="w-full mb-4" onClick={() => navigate("/lightlevelcontrol")}>
              Daily Light Integral Control
            </Button>
            <Button color="red_A200" size="lg" shape="round" className="w-full" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-blue_gray-900 shadow-xs rounded-lg p-5">
      <div className="flex flex-col items-center">
        <Heading size="md" as="h2" className="text-blue_gray-300">
          {title}
        </Heading>
        <div className="flex items-center mt-3">
          <Heading size="2xl" as="h3" className="mr-2">
            {value}
          </Heading>
          <Img src={`images/${icon}`} alt={icon} className="h-10" />
        </div>
      </div>
    </div>
  );
}

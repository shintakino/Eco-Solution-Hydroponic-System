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
  const [vpd, setVpd] = useState("");
  const [lux, setLux] = useState("");

  const [EC, setEC] = useState("");
  const [pH, setpH] = useState("");
  const [settingsData, setSettingsData] = useState(null);
  const [showPlantList, setShowPlantList] = useState(false);

  const togglePlantList = () => {
    setShowPlantList(!showPlantList);
  };

  const plantListStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: '999',
    textAlign: 'center',
  };

  const fetchSettingsData = () => {
    fetch('http://localhost/testSend/get_settings_set.php')
      .then(response => response.json())
      .then(data => {
        console.log('Settings data:', data); // Add this line to log the fetched data
        setSettingsData(data);
      })
      .catch(error => {
        console.error('Error fetching settings data:', error);
      });
  };
  const fetchTemperature = () => {
    fetch('http://localhost/testSend/get_latest_temperature.php')
      .then(response => response.json())
      .then(data => {
        setTemperature(data.temperature);
      })
      .catch(error => console.error('Error fetching temperature:', error));
  };

  const fetchEC = () => {
    fetch('http://localhost/testSend/get_latest_EC.php')
      .then(response => response.json())
      .then(data => {
        setEC(data.EC);
      })
      .catch(error => console.error('Error fetching EC:', error));
  };
  
  const fetchpH = () => {
    fetch('http://localhost/testSend/get_latest_ph.php')
      .then(response => response.json())
      .then(data => {
        setpH(data.ph_value);
      })
      .catch(error => console.error('Error fetching PH:', error));
  };

  const fetchHumidity = () => {
    fetch('http://localhost/testSend/get_latest_humidity.php', {
      method: 'GET',
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      setHumidity(data.humidity);
    })
    .catch(error => console.error('Error fetching humidity:', error));
  };

  const fetchVpd = () => {
    fetch('http://localhost/testSend/get_latest_vpd.php', {
      method: 'GET',
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      setVpd(data.vpd);
    })
    .catch(error => console.error('Error fetching vpd:', error));
  };

  const fetchLux = () => {
    fetch('http://localhost/testSend/get_latest_lux.php',{
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
    fetchVpd();
    fetchLux();
    fetchEC();
    fetchpH();
    fetchSettingsData();

    // Set up interval for data refresh (every 5 seconds in this example)
    const interval = setInterval(() => {
      fetchTemperature();
      fetchHumidity();
      fetchVpd();
      fetchLux();
      fetchEC();
      fetchpH();
      fetchSettingsData();
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const hydroponicPlants = [
    {
      name: "Tomato",
      vpdRange: "0.8 - 1.2 kPa",
      dliRange: "12 - 16 mol/m²/d",
      ecRange: "1.5 - 2.5 mS/cm",
      phRange: "5.5 - 6.5",
    },
    {
      name: "Lettuce",
      vpdRange: "0.6 - 1.0 kPa",
      dliRange: "10 - 14 mol/m²/d",
      ecRange: "1.0 - 2.0 mS/cm",
      phRange: "5.5 - 6.5",
    },
    {
      name: "Cucumber",
      vpdRange: "0.8 - 1.2 kPa",
      dliRange: "14 - 18 mol/m²/d",
      ecRange: "1.5 - 2.5 mS/cm",
      phRange: "5.5 - 6.5",
    },
    {
      name: "Bell Pepper",
      vpdRange: "0.7 - 1.1 kPa",
      dliRange: "12 - 16 mol/m²/d",
      ecRange: "1.2 - 2.2 mS/cm",
      phRange: "5.5 - 6.5",
    },
    {
      name: "Spinach",
      vpdRange: "0.6 - 1.0 kPa",
      dliRange: "10 - 14 mol/m²/d",
      ecRange: "1.0 - 2.0 mS/cm",
      phRange: "6.0 - 7.0",
    },
    {
      name: "Kale",
      vpdRange: "0.6 - 1.0 kPa",
      dliRange: "10 - 14 mol/m²/d",
      ecRange: "1.2 - 2.2 mS/cm",
      phRange: "6.0 - 7.5",
    },
    {
      name: "Basil",
      vpdRange: "0.8 - 1.2 kPa",
      dliRange: "12 - 16 mol/m²/d",
      ecRange: "1.2 - 2.0 mS/cm",
      phRange: "5.5 - 6.5",
    },
    {
      name: "Strawberry",
      vpdRange: "0.8 - 1.2 kPa",
      dliRange: "12 - 16 mol/m²/d",
      ecRange: "1.5 - 2.5 mS/cm",
      phRange: "5.5 - 6.5",
    },
    {
      name: "Bok Choy",
      vpdRange: "0.6 - 1.0 kPa",
      dliRange: "10 - 14 mol/m²/d",
      ecRange: "1.0 - 2.0 mS/cm",
      phRange: "6.0 - 7.0",
    },
    // Add more plants here
  ];
  

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
          <Button style={{
              color: '#fff',
              backgroundColor: '#4CAF50',
              padding: '14px 20px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              textDecoration: 'none',
              textAlign: 'center',
              display: 'inline-block',
              transitionDuration: '0.4s',
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              textShadow: '1px 1px 2px #000000',
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '0.5px',
          }} onClick={() => navigate("/sensordatagraph")}>
              View Visualize Data
          </Button>
            <DashboardCard title="Temperature" value={temperature ? `${temperature}°C` : "Loading..."} icon="img_arrow_up.svg" />
            <DashboardCard title="Humidity" value={humidity ? `${humidity}%` : "Loading..."} icon="img_fire.svg" />
            <DashboardCard title="VPD" value={vpd ? `${vpd}kPa` : "Loading..."} icon="img_fire.svg" />
            <DashboardCard title="EC-pH" value={EC && pH ? `${EC}mS/cm - ${pH}`: "Loading..."} icon="img_edit.svg" />
            <DashboardCard title="Light Level" value={lux ? `${lux} Lux` : "Loading..."} icon="img_search.svg" />
          </div>
          <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '30px', color: '#fff' }}>
            <h2 style={{ textAlign: 'center' }}>Set Settings</h2>
            {settingsData && (
              <div style={{ border: '2px solid #4CAF50', borderRadius: '10px', padding: '10px', marginTop: '10px' }}>
                <h3 style={{ color: '#4CAF50', fontSize: '1.5rem', marginBottom: '10px', textAlign: 'center' }}>VPD Settings</h3>
                <p style={{ marginBottom: '5px', textAlign: 'center' }}>Min VPD: {settingsData.temperature.min_vpd}</p>
                <p style={{ marginBottom: '10px', textAlign: 'center' }}>Max VPD: {settingsData.temperature.max_vpd}</p>

                <h3 style={{ color: '#4CAF50', fontSize: '1.5rem', marginBottom: '10px', textAlign: 'center' }}>Light Settings</h3>
                <p style={{ marginBottom: '10px', textAlign: 'center' }}>DLI: {settingsData.light.dli}</p>

                <h3 style={{ color: '#4CAF50', fontSize: '1.5rem', marginBottom: '10px', textAlign: 'center' }}>Solution Settings</h3>
                <p style={{ marginBottom: '5px', textAlign: 'center' }}>Min pH: {settingsData.solution.min_pH}</p>
                <p style={{ marginBottom: '5px', textAlign: 'center' }}>Max pH: {settingsData.solution.max_pH}</p>
                <p style={{ marginBottom: '5px', textAlign: 'center' }}>Min EC: {settingsData.solution.min_EC}</p>
                <p style={{ textAlign: 'center' }}>Max EC: {settingsData.solution.max_EC}</p>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button 
              style={{ 
                backgroundColor: '#4CAF50',
                color: '#fff',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'background-color 0.3s',
              }}
              onClick={togglePlantList}
            >
              Show Plant Parameter Presets
            </Button>
          </div>

          {/* Plant list popup */}
          {showPlantList && (
            <div style={{ 
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              zIndex: '999',
              textAlign: 'center'
            }}>
              <h2>Hydroponic Plants</h2>
              <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Plant</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>VPD Range</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>DLI Range</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>EC Range</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>pH Range</th>
                  </tr>
                </thead>
                <tbody>
                  {hydroponicPlants.map(plant => (
                    <tr key={plant.name}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{plant.name}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{plant.vpdRange}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{plant.dliRange}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{plant.ecRange}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{plant.phRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button 
                style={{ 
                  marginTop: '10px',
                  backgroundColor: '#FF5252',
                  color: '#fff',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                  transition: 'background-color 0.3s',
                }} 
                onClick={togglePlantList}
              >
                Close
              </Button>
            </div>
          )}


          <div className="flex flex-col items-center mt-8">
            <Img src="images/img_search_indigo_a200.svg" alt="search_icon" className="h-16 w-16 mb-3" />
            <Heading size="md" as="h2" className="text-blue_gray-300">
              Automation Settings
            </Heading>
          </div>
          <div className="flex flex-col items-center mt-8">
            <Button color="blue_A200" size="lg" shape="round" className="w-full mb-4" onClick={() => navigate("/tempcontrol")}>
              VPD Control
            </Button>
            <Button color="green_A700" size="lg" shape="round" className="w-full mb-4" onClick={() => navigate("/nutrientcontrol")}>
              Nutrient Control
            </Button>
            <Button color="amber_600" size="lg" shape="round" className="w-full mb-4" onClick={() => navigate("/lightlevelcontrol")}>
              Daily Light Integral Control
            </Button>
            <Button style={{ color: 'red', backgroundColor: '#FF5252', borderRadius: '50px', width: '100%' }} size="lg" shape="round" onClick={handleLogout}>
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

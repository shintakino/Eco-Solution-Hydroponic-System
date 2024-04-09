import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Heading, Img, Input, DatePicker, SelectBox } from "../../components";
import { useNavigate } from "react-router-dom";

const selectSpectrumOptionsList = [
  { label: "Sunlight", value: "option 1"},
  { label: "Cool White Fluorescent Lamps", value: "option 2"},
  { label: "Mogul Base High Pressure Sodium Lamps", value: "option 3"},
  { label: "DEHPS: ePapillion 1000 W", value: "option 4"},
  { label: "Metal Halide", value: "option 5"},
  { label: "CMH942: standard 4200 K color temperature", value: "option 6"},
  { label: "CMH930-Agro: 3100 K color temperature, spectrum shifted to red wavelengths", value: "option 7"},
];

const getSpectrumValue = (selectedValue) => {
  switch (selectedValue) {
      case "option 1":
          return 0.0185;
      case "option 2":
          return 0.0135;
      case "option 3":
          return 0.0122;
      case "option 4":
          return 0.0130;
      case "option 5":
          return 0.0141;
      case "option 6":
          return 0.0154;
      case "option 7":
          return 0.0170;
      default:
          return null;
  }
};

const convertFloatToTime = (hours) => {
  const totalSeconds = Math.floor(hours * 3600);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const remainingSeconds = totalSeconds % (24 * 3600);
  const hoursValue = Math.floor(remainingSeconds / 3600);
  const minutesValue = Math.floor((remainingSeconds % 3600) / 60);
  const secondsValue = remainingSeconds % 60;

  let formattedTime = '';

  if (days > 0) {
      formattedTime += `${days} day${days > 1 ? 's' : ''} `;
  }

  formattedTime += `${String(hoursValue).padStart(2, '0')}:${String(minutesValue).padStart(2, '0')}:${String(secondsValue).padStart(2, '0')}`;

  return formattedTime;
};

function convertUTCToLocalTime(utcTimeString) {
  // Create a new Date object from the UTC time string
  const utcDate = new Date(utcTimeString);

  // Get the UTC time in milliseconds
  const utcTime = utcDate.getTime();

  // Define the offset for Philippines timezone (UTC+8)
  const philippinesOffset = 0 * 60 * 60 * 1000;

  // Calculate the local time by adding the Philippines offset
  const localTime = new Date(utcTime + philippinesOffset);

  // Get the components of the local time
  const hours = String(localTime.getHours()).padStart(2, '0');
  const minutes = String(localTime.getMinutes()).padStart(2, '0');
  const seconds = String(localTime.getSeconds()).padStart(2, '0');

  // Construct the local time string
  const localTimeString = `${hours}:${minutes}:${seconds}`;

  return localTimeString;
}

const convertFloatToSeconds = (days) => {
  const totalSeconds = days*60*60;
  return totalSeconds;
};

export default function LightLevelControlPage() {
  const navigate = useNavigate();
  const [lux, setLux] = useState(null); // State to store lux value
  const [dliValue, setDliValue] = useState(''); // State to store DLI value
  const [selectedSpectrum, setSelectedSpectrum] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const CalibrationFactor = getSpectrumValue(selectedSpectrum);
  const timeDuration = dliValue / ((lux * CalibrationFactor)*(3600/1000000));
  const formattedTime = convertFloatToTime(timeDuration);
  const formatedSeconds = convertFloatToSeconds(timeDuration);
  //Debug Console
  console.log('Data:',formattedTime);

  useEffect(() => {
    // Fetch lux value when component mounts
    const fetchLuxValue = async () => {
      try {
        const response = await fetch('http://192.168.100.15/testSend/get_latest_lux.php');
        if (response.ok) {
          const luxData = await response.json();
          // Extract lux value from response and set it in state
          setLux(Number(luxData.light)); // Convert lux to number
        } else {
          throw new Error('Failed to fetch lux value');
        }
      } catch (error) {
        console.error('Error fetching lux value:', error);
        // Handle error if lux value cannot be fetched
      }
    };

    fetchLuxValue(); // Call the function to fetch lux value
  }, []); // Empty dependency array ensures this effect runs only once on component mount


  const handleDliBlur = (e) => {
    const { value } = e.target;
    setDliValue(Number(value));
  };

  const handleApplySettings = () => {
    setErrorMessage('');
    if (dliValue && selectedSpectrum && selectedTime) {
      if (dliValue < 0) {
          setErrorMessage('DLI should be a positive number with up to two decimal points.');
          return;
      }
              // Prepare data to send to the backend
              const requestData = {
                  type: selectedSpectrum,
                  set_time: convertUTCToLocalTime(selectedTime),
                  dli: dliValue,
                  time_duration: formatedSeconds,
                  date_today: new Date().toISOString().slice(0, 10),
              };

              // Send data to the PHP backend
              console.log('Lux to be sent:', getSpectrumValue(selectedSpectrum));
              console.log('Data to be sent:', requestData);
              fetch('http://192.168.100.15/testSend/save_light_settings.php', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(requestData),
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Database is not online');
                }
                return response.json();
              })
              .then(data => {
                  // Handle response from the backend
                  console.log('Settings saved successfully:', data);
                  setSuccessMessage('Settings applied successfully!');
                  setTimeout(() => navigate("/desktopmaindashboard"), 3000);
              })
              .catch(error => {
                  console.error('Error saving settings:', error);
                  setErrorMessage('Error saving settings. Please try again.');
                  // Show the error message in a pop-up
                  alert('Database is not online');
                  navigate("/desktopmaindashboard");
              });
            } else {
              setErrorMessage('Please fill all the required fields.');
      }
  };
  

  const handleCancel = () => {
    const userConfirmed = window.confirm('Are you sure you want to cancel?');
    if (userConfirmed) {
      navigate("/desktopmaindashboard");
    }
  };
  return (
    <>
      <Helmet>
        <title>Light Level Settings</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-center w-full p-5 bg-gray-900">
        <div className="max-w-[600px] w-full">
          <Heading size="xl" as="h1" className="text-center text-gray-100 text-shadow-ts mb-8">
            Automation Settings: Light Level Control
          </Heading>
            <SelectBox
              placeholderClassName="bg-blue_gray-800 text-gray-400"
              isSearchable={false}
              placeholder="Select Spectrum"
              isMulti={false}
              options={selectSpectrumOptionsList}
              name="select_spectrum"
              onChange={setSelectedSpectrum}
              value={selectedSpectrum}
              className="w-full mb-4 text-gray-400 font-bold border border-blue_gray-700 bg-blue_gray-800 rounded px-4 py-2"
            />
            <DatePicker.Time
              placeholder="Select Time"
              onChange={setSelectedTime}
              value={selectedTime}
              className="w-full mb-4 text-gray-400 font-bold border border-blue_gray-700 bg-blue_gray-800 rounded px-4 py-2"
            />
            <div className="flex flex-col mb-4">
              <div className="flex flex-col mb-2">
                <Heading size="s" as="h3" className="text-gray-400">
                  DLI (Daily Light Integral)
                </Heading>
                <div className="flex items-center mt-2">
                  <Img src="images/img_settings.svg" alt="settings_icon" className="h-10 mr-2" />
                  <Input
                    className="w-full text-gray-400 font-bold border border-blue_gray-700 bg-blue_gray-800 rounded px-4 py-2"
                    name="dli"
                    placeholder="DLI"
                    step="0.1"
                    min="0"
                    max="99.99"
                    pattern="\d+(\.\d{0,2})?"
                    onInput={(e) => {
                      let { value } = e.target;
                      // Ensure only numbers and up to two decimal places are allowed
                      value = value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except '.'
                      value = value.replace(/(\..*)\./g, '$1'); // Remove additional '.' characters
                      // Ensure the value is within the specified range
                      if (parseFloat(value) > 99.99) {
                        value = '99.99'; // Set the value to the maximum if it exceeds 99.9
                      }
                      e.target.value = value;
                      setDliValue(Number(value)); // Update the DLI value in state
                    }}
                    onBlur={handleDliBlur} // Call handleDliBlur function when the input field loses focus
                  />
                  <Heading as="h4" className="text-gray-400 ml-2 font-bold">
                    mol/m²/day
                  </Heading>
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <Heading size="s" as="h3" className="text-gray-400">
                  Grow Light Duration
                </Heading>
                <div className="flex items-center mt-2">
                  <Img src="images/img_frame.svg" alt="frame_icon" className="h-10 mr-2" />
                  <Heading as="h4" className="text-gray-400 font-bold">
                  {formattedTime}
                  </Heading>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mb-8">
              <Button
                color="green_A700"
                shape="round"
                className="w-full mb-4 font-bold text-xl sm:text-lg"
                onClick={handleApplySettings}
              >
                Apply Settings
              </Button>
              <Button
                onClick={() => handleCancel()}
                color="red_800"
                shape="round"
                className="w-full font-bold text-xl sm:text-lg"
              >
                Cancel Settings
              </Button>
            </div>
            {errorMessage && (
                  <div className="text-red-500 mt-4">{errorMessage}</div>
                )}
                {successMessage && (
                  <div className="text-green-400 mt-4">{successMessage}</div>
                )}
        </div>
      </div>
    </>
  );
}

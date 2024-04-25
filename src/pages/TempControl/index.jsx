import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Input, Heading } from "../../components";
import { useNavigate } from "react-router-dom";

export default function TempControlPage() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleApplySettings = () => {
    setErrorMessage('');
    const minTemperatureInput = document.getElementsByName('minTemp')[0];
    const maxTemperatureInput = document.getElementsByName('maxTemp')[0];
  
    // Check if any of the input fields are empty
    if (!minTemperatureInput.value.trim() || !maxTemperatureInput.value.trim()) {
      setErrorMessage('Please fill in all the fields.');
      return;
    }
  
    const minTemperature = parseFloat(minTemperatureInput.value);
    const maxTemperature = parseFloat(maxTemperatureInput.value);
  
    // Check if max temperature is greater than min temperature
    if (maxTemperature <= minTemperature) {
      setErrorMessage('Max temperature must be greater than Min temperature.');
      return;
    }
  
    // Send a POST request to save_temperature_settings.php
    fetch('http://192.168.1.108/testSend/save_temperature_settings.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        min: minTemperature,
        max: maxTemperature,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Database is not online');
        }
        return response.text();
      })
      .then(data => {
        console.log(data); // Log the response from the server
        // Check if the response contains a success message
        if (data.includes('successfully')) {
          // Data is successfully updated, set the success message
          setSuccessMessage('Your temperature settings have been updated!');
          // Navigate to the main dashboard after a delay
          setTimeout(() => navigate("/desktopmaindashboard"), 3000);
        } else {
          // Handle other cases or display an error message if needed
          console.error('Error saving temperature settings:', data);
        }
      })
      .catch(error => {
        console.error('Error saving temperature settings:', error);
        // Show the error message in the popup
        alert('Database is not online');
        navigate("/desktopmaindashboard");
      });
  };
  

  const handleCancel = () => {
    // Display a confirmation prompt
    const userConfirmed = window.confirm('Are you sure you want to cancel?');
    
    // If user confirms, navigate to the main dashboard
    if (userConfirmed) {
      navigate("/desktopmaindashboard");
    }
  };
  return (
    <>
      <Helmet>
        <title>Temperature Control</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-center w-full px-4 py-8 bg-gray-900">
        <div className="max-w-screen-lg">
          <div className="bg-blue_gray-900 rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <Heading size="xl" as="h1" className="text-gray-100 text-shadow-ts">
                Automation Settings:
              </Heading>
            </div>
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
              <div className="flex flex-col items-center justify-center max-w-md">
                <Heading size="2xl" as="h2" className="text-green-400 mb-6 text-center">
                  Temperature Control
                </Heading>
                <div className="flex flex-col items-center gap-6 w-full">
                  <div className="flex flex-col items-center w-full gap-4">
                    <Heading size="lg" as="h3" className="text-gray-100 text-center">
                      Temperature Range
                    </Heading>
                    <div className="flex justify-center gap-4 w-full">
                      <Input
                        name="minTemp"
                        placeholder="Min"
                        className="flex-1 h-12 px-4 text-gray-400 text-lg font-bold border-blue_gray-700 bg-blue_gray-800 rounded-md"
                        type="number"
                        step="0.1"
                        min="0"
                        max="99.9"
                      />
                      <Input
                        name="maxTemp"
                        placeholder="Max"
                        className="flex-1 h-12 px-4 text-gray-400 text-lg font-bold border-blue_gray-700 bg-blue_gray-800 rounded-md"
                        type="number"
                        step="0.1"
                        min="0"
                        max="99.9"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4 w-full">
                    <Button
                      color="green_A700"
                      shape="round"
                      className="w-full max-w-sm h-12 px-6 font-bold text-lg"
                      onClick={handleApplySettings}
                    >
                      Apply Settings
                    </Button>
                    <Button
                      color="red_800"
                      shape="round"
                      className="w-full max-w-sm h-12 px-6 font-bold text-lg"
                      onClick={handleCancel}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

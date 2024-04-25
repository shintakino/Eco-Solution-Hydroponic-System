import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Text, Input, Heading, Img } from "../../components";
import { useNavigate } from "react-router-dom";

export default function NutrientControlPage() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleApplySettings = () => {
    setErrorMessage('');
    const minPHInput = document.getElementsByName('minPH')[0];
    const maxPHInput = document.getElementsByName('maxPH')[0];
    const minECInput = document.getElementsByName('minEC')[0];
    const maxECInput = document.getElementsByName('maxEC')[0];
  
    // Check if any of the input fields are empty
    if (
      !minPHInput.value.trim() ||
      !maxPHInput.value.trim() ||
      !minECInput.value.trim() ||
      !maxECInput.value.trim()
    ) {
      setErrorMessage('Please fill in all the fields.');
      return;
    }
  
    const minPH = parseFloat(minPHInput.value);
    const maxPH = parseFloat(maxPHInput.value);
    const minEC = parseFloat(minECInput.value);
    const maxEC = parseFloat(maxECInput.value);
  
    // Check if max FIELD is greater than min FIELD
    if (maxPH <= minPH) {
      setErrorMessage('Max PH must be greater than Min PH.');
      return;
    }
    if (maxEC <= minEC) {
      setErrorMessage('Max EC must be greater than Min EC.');
      return;
    }
  
    // Send a POST request to save_PH_EC_settings.php
    fetch('http://192.168.1.108/testSend/save_Ph_Ec_settings.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        minPH: minPH,
        maxPH: maxPH,
        minEC: minEC,
        maxEC: maxEC,
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
          setSuccessMessage('Your PH_EC settings have been updated!');
          // Navigate to the main dashboard after a delay
          setTimeout(() => navigate("/desktopmaindashboard"), 3000);
        } else {
          // Handle other cases or display an error message if needed
          console.error('Error saving PH_EC settings:', data);
        }
      })
      .catch(error => {
        console.error('Error saving PH_EC settings:', error);
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
        <title>Nutrient Control</title>
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
            <div className="w-full max-w-md mb-8">
              <div className="flex items-center mb-4">
                <Img src="images/img_favorite.svg" alt="favorite_icon" className="h-6 mr-2" />
                <Heading size="lg" as="h3" className="text-green-400">
                  pH Level Range
                </Heading>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  color="blue_gray_800"
                  size="sm"
                  variant="fill"
                  shape="round"
                  name="minPH"
                  placeholder="Min"
                  type="number"
                  step="0.1"
                  min="0"
                  max="99.9"
                  wrapClassName="bg-blue_gray-800 border
                border-blue_gray-700 border-solid px-[35px] py-[34px] rounded md:w-full"
                />
                <Input
                  color="blue_gray_800"
                  size="sm"
                  variant="fill"
                  shape="round"
                  name="maxPH"
                  placeholder="Max"
                  type="number"
                  step="0.1"
                  min="0"
                  max="99.9"
                  wrapClassName="bg-blue_gray-800 border
                border-blue_gray-700 border-solid px-[35px] py-[34px] rounded md:w-full"
                />
              </div>
            </div>
            <div className="w-full max-w-md mb-8">
              <div className="flex items-center mb-4">
                <Img src="images/img_frame_amber_600.svg" alt="frame_icon" className="h-6 mr-2" />
                <Heading size="lg" as="h3" className="text-green-400">
                  EC Range
                </Heading>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  color="blue_gray_800"
                  size="sm"
                  variant="fill"
                  shape="round"
                  name="minEC"
                  placeholder="Min"
                  type="number"
                  step="0.1"
                  min="0"
                  max="99.9"
                  wrapClassName="bg-blue_gray-800 border
                border-blue_gray-700 border-solid px-[35px] py-[34px] rounded md:w-full"
                />
                <Input
                  color="blue_gray_800"
                  size="sm"
                  variant="fill"
                  shape="round"
                  name="maxEC"
                  placeholder="Max"
                  type="number"
                  step="0.1"
                  min="0"
                  max="99.9"
                  wrapClassName="bg-blue_gray-800 border
                border-blue_gray-700 border-solid px-[35px] py-[34px] rounded md:w-full"
                />
              </div>
            </div>
            <div className="w-full max-w-md">
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
    </>
  );
}

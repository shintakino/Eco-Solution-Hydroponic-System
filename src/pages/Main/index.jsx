import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Text, Img, Button } from "../../components";
import { Navigate, useNavigate } from "react-router-dom";
export default function MainPage() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleWork = () => {
    navigate("/work"); 
  };
  const handleJoin = () => {
    navigate("/signup"); 
  };
  return (
    <>
      <Helmet>
        <title>Welcome to Eco-Solution</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center w-full gap-8 px-14 py-[129px] md:p-5 bg-gray-900">
        <div className="flex flex-col items-center w-[43%] md:w-[70%] sm:w-full md:p-5 bg-gradient rounded-[44px] shadow-lg">
          <div className="flex items-center justify-center w-[20%] md:w-[15%] p-4 border-white-A700 border border-solid rounded-[44px] bg-white">
            <Img src="images/img_icon.svg" alt="icon_one" className="h-[32px]" />
          </div>
          <div className="h-[2px] w-full bg-white-A700 my-2" />
          <div className="flex flex-col items-center p-8 sm:p-5 border-white-A700 border-t border-b border-solid">
            <Text size="lg" as="p" className="tracking-[8.00px] uppercase text-center">
              Hydroponics
            </Text>
            <Text size="xs" as="p" className="tracking-[3.20px] uppercase text-center mt-2">
              An automated Arduino-based Hydroponics system.
            </Text>
          </div>
          <div className="h-[2px] w-full bg-white-A700 my-2" />
          <div className="flex items-center justify-between w-[84%] md:w-full border-white-A700 border border-solid rounded">
            <a href="/Intro"  rel="noreferrer" className="w-1/4 p-4 hover:bg-white hover:text-gray-900">
              <Text size="xs" as="p" className="tracking-[3.20px] uppercase text-center">
                Intro
              </Text>
            </a>
            <Button
              color="white_A700"
              size="xs"
              variant="outline"
              shape="square"
              className="w-1/4 p-4 tracking-[3.20px] font-titilliumweb uppercase font-light"
              onClick={handleWork}
            >
              Work
            </Button>
            <a href="/About" rel="noreferrer" className="w-1/4 p-4 hover:bg-white hover:text-gray-900">
              <Text size="xs" as="p" className="tracking-[3.20px] uppercase text-center">
                About
              </Text>
            </a>
            <div className="w-1/4 p-4">
              <Button
                color="white_A700"
                size="xs"
                variant="outline"
                shape="square"
                className="w-full tracking-[3.20px] font-titilliumweb uppercase font-light"
                onClick={handleJoin}
              >
                Join Us
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full mt-8">
          <div className="flex items-center gap-2">
            <Img src="images/img_icon_white_a700.svg" alt="icon_three" className="h-[16px]" />
            <a href="https://github.com/shintakino" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Text as="p">GitHub Repo</Text>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

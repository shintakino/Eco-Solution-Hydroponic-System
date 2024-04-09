import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Input, Text, Heading, Img } from "../../components";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";

export default function SignUPPage() {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://192.168.196.60/testSend/signup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signUpData)
      });

      if (response.ok) {
        // Sign-up successful, handle accordingly
        console.log("Sign-up successful");
      } else {
        // Handle sign-up error
        console.error("Sign-up failed");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.196.60/testSend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        // Login successful, handle accordingly
        console.log("Login successful");
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };


  const handleInputChange = (event, setData) => {
    const { name, value } = event.target || event;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  

  return (
    <>
      <Helmet>
        <title>sign-up</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex justify-center w-full px-5 py-[84px] md:p-5 bg-gray-900">
        <div className="flex flex-col items-start w-full max-w-[800px] mt-11 pb-10 pl-5 pr-5 md:pl-0 md:pr-0 sm:pl-0 sm:pr-0 bg-gray-900_d8 rounded">
          <Img
            src="images/img_div_close.svg"
            alt="divclose_one"
            className="h-[64px] w-[64px] top-[125px] left-[75%] transform translate-x-[-50%] md:static sm:left-[50%] sm:transform-none absolute"
          />
          <div className="flex w-full mt-[7px]">
            <div className="flex flex-col w-full">
              <Heading as="h1" className="tracking-[8.00px] uppercase z-[1] text-center">
                Join Us
              </Heading>
              <div className="h-[42px] mt-[-36px] relative border-white-A700 border-b border-solid" />
            </div>
          </div>
          <Tabs
            className="flex flex-col w-full mt-10 mb-[5px] gap-[37px] p-5 bg-gray-900_e5 shadow-sm rounded"
            selectedTabClassName="!text-white-A700 border-white-A700_7f border-b border-dashed bg-teal-400"
            selectedTabPanelClassName="mb-8 relative tab-panel--selected"
          >
            <TabList className="flex justify-between items-end gap-[10px] p-[13px] md:px-[110px] md:py-[13px] sm:pt-[26px] sm:pb-[13px] sm:px-[13px]">
              <Tab className="flex items-center justify-center w-[50%] text-white-A700 font-titilliumweb text-center text-xl font-light">
                Sign Up
              </Tab>
              <Tab className="flex items-center justify-center w-[50%] text-white-A700 font-titilliumweb text-center text-xl font-light bg-colors border-solid">
                Log In
              </Tab>
            </TabList>
            <TabPanel className="items-center w-full relative">
              <div className="w-full">
                <div className="flex flex-col items-center gap-[20px]">
                  <a href="#" className="text-center">
                    <Text size="lg" as="p" className="tracking-[8.00px] uppercase">
                      Sign Up for Free
                    </Text>
                  </a>
                  <div className="flex flex-col gap-5 w-full max-w-[400px]">
                    <Input
                      shape="round"
                      type="text"
                      name="firstName"
                      placeholder={`First Name`}
                      className="w-full tracking-[3.20px] font-titilliumweb uppercase font-light"
                      onChange={(event) => handleInputChange(event, setSignUpData)}
                    />
                    <Input
                      shape="round"
                      type="text"
                      name="lastName"
                      placeholder={`Last Name`}
                      className="w-full tracking-[3.20px] font-titilliumweb uppercase font-light"
                      onChange={(event) => handleInputChange(event, setSignUpData)}
                    />
                    <Input
                      shape="round"
                      type="email"
                      name="email"
                      placeholder={`Email Address`}
                      className="w-full tracking-[3.20px] font-titilliumweb uppercase font-light"
                      onChange={(event) => handleInputChange(event, setSignUpData)}
                    />
                    <Input
                      shape="round"
                      type="password"
                      name="password"
                      placeholder={`Set A Password`}
                      className="w-full tracking-[3.20px] font-titilliumweb uppercase font-light"
                      onChange={(event) => handleInputChange(event, setSignUpData)}
                    />
                    <Button
                      color="teal_400"
                      size="sm"
                      shape="square"
                      className="w-full tracking-[2.56px] font-inter uppercase font-semibold"
                      onClick={handleSignUp}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel className="items-center w-full relative">
              <div className="w-full">
                <div className="flex flex-col gap-[20px]">
                  <div className="flex px-5">
                    <Text size="lg" as="p" className="tracking-[8.00px] uppercase text-center w-full">
                      WELCOME BACK!
                    </Text>
                  </div>
                  <div className="flex flex-col">
                    <Input
                      shape="round"
                      type="email"
                      name="email"
                      placeholder={`Email Address`}
                      className="self-stretch tracking-[3.20px] font-titilliumweb uppercase font-light"
                      onChange={(event) => handleInputChange(event, setLoginData)}
                    />
                    <Input
                      shape="round"
                      type="password"
                      name="password"
                      placeholder={`Set A Password`}
                      className="self-stretch mt-[20px] tracking-[3.20px] font-titilliumweb uppercase font-light"
                      onChange={(event) => handleInputChange(event, setLoginData)}
                    />
                    <a href="#" className="mt-2 text-center">
                      <Text size="md" as="p">
                        Forgot Password?
                      </Text>
                    </a>
                    <Button
                      color="teal_400"
                      size="sm"
                      shape="square"
                      className="w-full mt-[20px] mb-[40px] tracking-[2.56px] font-inter uppercase font-semibold"
                      onClick={handleLogin}
                    >
                      Log In
                    </Button>
                  </div>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}

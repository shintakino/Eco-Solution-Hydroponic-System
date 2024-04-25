import React, { useEffect ,useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Text, Heading, Img } from "../../components";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from '../AuthContext';

export default function SignUPPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const handleClose = () => {
    navigate("/"); 
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setTimeout(function(){
      setMsg("");
    }, 15000);
  }, [])

  

  const handleInputChange = (e, type) => {
    switch (type) {
      case "firstName":
        console.log("First Name changed:", e.target.value);
        setError("");
        setFirstName(e.target.value);
        if (e.target.value === "") {
          setError("First Name has left blank!");
        }
        break;
      case "lastName":
        console.log("Last Name changed:", e.target.value);
        setError("");
        setLastName(e.target.value);
        if (e.target.value === "") {
          setError("Last Name has left blank!");
        }
        break;
      case "email":
        console.log("Email changed:", e.target.value);
        setError("");
        setEmail(e.target.value);
        if (e.target.value === "") {
          setError("Email has left blank!");
        }
        break;
      case "password":
        console.log("Password changed:", e.target.value);
        setError("");
        setPassword(e.target.value);
        if (e.target.value === "") {
          setError("Password has left blank!");
        } else {
          setMsg("All fields are valid!");
        }
        break;
      default:
    }
  };

  function checkPassword() {
    if (password.length < 8) {
      console.log("Password length is less than 8 characters");
      setError("Password must be at least 8 characters");
    }
  }
  
  function checkEmail(email) {
    fetch('http://192.168.1.108/testSend/checkemail.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: email,
      }),
    })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Check if email exists
    if (data) {
      setError("Email already exists!");
    } else {
      setMsg("Email is unique!");
    }
  })
  .catch(error => {
    setError('There was a problem with the fetch operation:', error);
  });
  }

  
  function handleSignUp() {
    
    if (firstName !== "" && lastName !== "" && email !== "" && password !== "") {
      // Adjust the URL to match the location of your PHP script
      checkEmail(email);
  
      fetch('http://192.168.1.108/testSend/signup.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    })
      .then(data => {
        // Handle response from the PHP script
        console.log(data); // Log the response for debugging
        // Reset form fields after successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      })
      .catch(error => {
        // Handle errors
        setError('There was a problem with the fetch operation:', error);
        // You can update state or display an error message here
      });
    } else {
      // If any field is empty, display an error message
      setError("All fields are required!");
      // You can update state or display an error message here
    }
  }

  function handleLogin() {
    if (email !== "" && password !== "") {
      // Call the login function from the AuthContext
      login(email, password)
        .then(() => {
          // If login is successful, navigate to the main page
          navigate("/desktopmaindashboard");
        })
        .catch((error) => {
          // If there's an error during login, display the error message
          setError("Error logging in: " + error.message);
        });
    } else {
      // If email or password is empty, display an error message
      setError("Email and password are required.");
    }
  }
  
  
  


  return (
    <>
      <Helmet>
        <title>sign-up</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex justify-center w-full px-5 py-[84px] md:p-5 bg-gray-900">
        <div className="flex flex-col items-start w-full max-w-[800px] mt-11 pb-10 pl-5 pr-5 md:pl-0 md:pr-0 sm:pl-0 sm:pr-0 bg-gray-900_d8 rounded">
        <button onClick={handleClose} className="button-wrapper" style={{ zIndex: 999 }}>
          <Img
            src="images/img_div_close_white_a700.svg"
            alt="divclose_one"
            className="h-[64px] w-[64px] top-[120px] left-[75%] transform translate-x-[-50%] md:static sm:left-[50%] sm:transform-none absolute"
          />
        </button>
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
                    <div style={{ marginBottom: "10px" }}>
                      <label htmlFor="firstName">First Name:</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => handleInputChange(e,"firstName")}
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          fontFamily: "titilliumweb",
                          fontWeight: "light",
                        }}
                        placeholder={`First Name`}
                        className="w-full tracking-[3.20px] font-titilliumweb font-light"
                      />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <label htmlFor="lastName">Last Name:</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={lastName} 
                        onChange={(e) => handleInputChange(e,"lastName")}
                        style={{ 
                          width: '100%', 
                          padding: '10px', 
                          borderRadius: '5px', 
                          border: '1px solid #ccc',
                          fontFamily: 'titilliumweb', 
                          fontWeight: 'light' 
                        }}
                        placeholder={`Last Name`}
                        className="w-full tracking-[3.20px] font-titilliumweb font-light"
                        
                      />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <label htmlFor="email">Email:</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => handleInputChange(e,"email")}
                        style={{ 
                          width: '100%', 
                          padding: '10px', 
                          borderRadius: '5px', 
                          border: '1px solid #ccc',
                          fontFamily: 'titilliumweb',
                          fontWeight: 'light' 
                        }}
                        placeholder={`Email Address`}
                        className="self-stretch tracking-[3.20px] font-titilliumweb font-light"
                        
                      />
                      
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <label htmlFor="password">Password:</label>
                      <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => handleInputChange(e,"password")}
                        onBlur={checkPassword}
                        style={{ 
                          width: '100%', 
                          padding: '10px', 
                          borderRadius: '5px', 
                          border: '1px solid #ccc',
                          fontFamily: 'titilliumweb',
                          fontWeight: 'light' 
                        }}
                        placeholder={`Set A Password`}
                        className="self-stretch tracking-[3.20px] font-titilliumweb font-light"
                      />
                    </div>
                    {error && <span className="text-red-500">{error}</span>}
                    <Button
                      type="submit"
                      color="teal_400"
                      size="sm"
                      shape="square"
                      className="w-full tracking-[2.56px] font-inter uppercase font-semibold"
                      onClick={handleSignUp}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel className="items-center w-full relative">
              <div className="w-full">
                <div className="flex flex-col gap-[20px]">
                  <div className="flex px-5">
                    <Text size="lg" as="p" className="tracking-[8.00px]  text-center w-full">
                      WELCOME BACK!
                    </Text>
                  </div>
                  <div className="flex flex-col">
                    <div style={{ marginBottom: '10px' }}>
                      <label htmlFor="email">Email:</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={email} 
                        onChange={(e) => handleInputChange(e,"email")}
                        style={{ 
                          width: '100%', 
                          padding: '10px', 
                          borderRadius: '5px', 
                          border: '1px solid #ccc',
                          fontFamily: 'titilliumweb',
                          fontWeight: 'light' 
                        }}
                        placeholder={`Email Address`}
                        className="self-stretch tracking-[3.20px] font-titilliumweb  font-light"
                      />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <label htmlFor="password">Password:</label>
                      <input 
                        type="password" 
                        id="password" 
                        name="password"
                        onChange={(e) => handleInputChange(e,"password")}
                        onBlur={checkPassword}
                        style={{ 
                          width: '100%', 
                          padding: '10px', 
                          borderRadius: '5px', 
                          border: '1px solid #ccc',
                          fontFamily: 'titilliumweb',
                          fontWeight: 'light' 
                        }}
                        placeholder={`Set A Password`}
                        className="self-stretch tracking-[3.20px] font-titilliumweb  font-light"
                      />
                    </div>
                    {error && <span className="text-red-500">{error}</span>}
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
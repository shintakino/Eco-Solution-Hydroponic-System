import React, { useEffect ,useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Text, Heading, Img } from "../../components";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";

export default function SignUPPage() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
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
        setError("");
        setfirstName(e.target.value);
        if (e.target.value === "") {
          setfirstName("First Name has left blank!");
        }
        break;
      case "lastName":
        setError("");
        setlastName(e.target.value);
        if (e.target.value === "") {
          setlastName("Last Name has left blank!");
        }
        break;
      case "email":
        setError("");
        setemail(e.target.value);
        if (e.target.value === "") {
          setemail("Email has left blank!");
        }
        break;
      case "password":
        setError("");
        setpassword(e.target.value);
        if (e.target.value === "") {
          setpassword("Password has left blank!");
        }
        else{
          setMsg("All fields are valid!");
        }
        break;
      default:
    }
  };

  function checkPassword(){
    if (password.length < 8){
      setError("Password must be at least 8 characters");
    }
  }

  
  function checkEmail(){
    var url = "http://192.168.196.60/testSend/checkemail.php";
    var headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    var Data = {
        email: email
    }
    fetch(url,{
      method: "POST",
      headers: headers,
      body: JSON.stringify(Data)
    }).then((response) => response.json())
    .then((response) => {
      setError(response[0].result);
    }).catch((err) => {
      setError(err);
      console.log(err);
    });
    
  }
  

  function handleSignUp(){
    if (firstName !== "" && lastName !== "" && email !== "" && password !== ""){
      var url = "http://192.168.196.60/testSend/signUp.php";
    var headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    var Data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }
    fetch(url,{
      method: "POST",
      headers: headers,
      body: JSON.stringify(Data)
    }).then((response) => response.json())
      .then((response) => {
        setMsg(response[0].result);
    }).catch((err) => {
        setError(err);
        console.log(err);
    });
    setfirstName("");
    setlastName("");
    setemail("");
    setpassword("");
  }
  else{
    setError("All fields are required!");
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
                    onBlur={checkEmail}
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
                    className="self-stretch mt-[20px] tracking-[3.20px] font-titilliumweb font-light"
                  />
                </div>
                    {errors.map((error, index) => (
                      <span key={index} className="text-red-500">
                        {error}
                      </span>
                    ))}
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
                  <form className="flex flex-col">
                  <div style={{ marginBottom: '10px' }}>
                  <label htmlFor="email">Email:</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
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
                    style={{ 
                      width: '100%', 
                      padding: '10px', 
                      borderRadius: '5px', 
                      border: '1px solid #ccc',
                      fontFamily: 'titilliumweb',
                      fontWeight: 'light' 
                    }}
                    placeholder={`Set A Password`}
                    className="self-stretch mt-[20px] tracking-[3.20px] font-titilliumweb uppercase font-light"
                  />
                </div>
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
                      
                    >
                      Log In
                    </Button>
                  </form>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}

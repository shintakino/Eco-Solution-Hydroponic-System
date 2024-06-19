import React, { useContext } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import AuthContext from "pages/AuthContext"; 
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import DESKTOPMAINDASHBOARD from "pages/DESKTOPMAINDASHBOARD";
import TempControl from "pages/TempControl";
import LightLevelControl from "pages/LightLevelControl";
import NutrientControl from "pages/NutrientControl";
import Main from "pages/Main";
import Intro from "pages/Intro";
import Work from "pages/Work";
import About from "pages/About";
import SignUP from "pages/SignUP";
import SignUPOne from "pages/SignUPOne";
import SensorDataGraph from "pages/SensorDataGraph";

const ProjectRoutes = () => {
  const { user } = useContext(AuthContext);
  // Function to check if the user is authenticated
  const isAuthenticated = () => {

    return !!user;
  };

  let element = useRoutes([
    { path: "/", element: <Main />, },
    { path: "*", element: <NotFound /> },
    {
      path: "desktopmaindashboard",
      element: isAuthenticated() ? <DESKTOPMAINDASHBOARD /> : <Navigate to="/" />, // Redirect to login if not logged in
    },
    {
      path: "tempcontrol",
      element: isAuthenticated() ? <TempControl /> : <Navigate to="/" />, // Redirect to login if not logged in
    },
    {
      path: "lightlevelcontrol",
      element: isAuthenticated() ? <LightLevelControl /> : <Navigate to="/" />, // Redirect to login if not logged in
    },
    {
      path: "nutrientcontrol",
      element: isAuthenticated() ? <NutrientControl /> : <Navigate to="/" />, // Redirect to login if not logged in
    },
    {
      path: "sensordatagraph",
      element: isAuthenticated() ? <SensorDataGraph /> : <Navigate to="/" />, // Redirect to login if not logged in
    },
    // {
    //   path: "desktopmaindashboard",
    //   element: <DESKTOPMAINDASHBOARD />, // Redirect to login if not logged in
    // },
    // {
    //   path: "tempcontrol",
    //   element:  <TempControl />, // Redirect to login if not logged in
    // },
    // {
    //   path: "lightlevelcontrol",
    //   element:  <LightLevelControl />, // Redirect to login if not logged in
    // },
    // {
    //   path: "nutrientcontrol",
    //   element: <NutrientControl /> , // Redirect to login if not logged in
    // },
    // {
    //   path: "sensordatagraph",
    //   element: <SensorDataGraph />, // Redirect to login if not logged in
    // },
    {
      path: "home",
      element: <Home />,
    },
    {
      path: "intro",
      element: <Intro />,
    },
    {
      path: "work",
      element: <Work />,
    },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "signup",
      element: <SignUP />,
    },
    {
      path: "signupone",
      element: <SignUPOne />,
    },
  ]);

  return element;
};

export default ProjectRoutes;

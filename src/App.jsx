import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "pages/AuthContext"; // Import the AuthProvider
import Routes from "./Routes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  );
}

export default App;

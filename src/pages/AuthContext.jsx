import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    return fetch('http://192.168.1.108/testSend/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: email,
        password: password,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.result === "Login successful") {
        setUser(email); // Set the user in the context upon successful login
      } else {
        // Handle login error
        throw new Error(data.error);
      }
    })
    .catch(error => {
      // Handle fetch error or login error
      throw new Error('Error logging in: ' + error.message);
    });
  };

  const logout = () => {
    setUser(null); // Clear the user from the context upon logout
  };

  const checkEmailStatus = (email) => {
    return fetch('http://192.168.1.108/testSend/checkemailstatus.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: email,
      }),
    })
    .then(response => response.json())
    .catch(error => {
      // Handle fetch error
      console.error('Error checking email status:', error);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkEmailStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;

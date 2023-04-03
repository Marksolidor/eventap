import React, { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post("https://eventapp-backend-production.up.railway.app/users", {
        email,
        password,
      });
      const data = response.data;
      setUser(data);
      console.log("Usuario guardado:", data);
    } catch (error) {
      throw new Error("Credenciales inválidas");
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = () => {
    return user ? true : false;
  };

  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={contextValue} {...props} />;
}

export { AuthProvider, AuthContext };

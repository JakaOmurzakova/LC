import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const authContext = createContext();
export const useAuthContext = () => useContext(authContext);

const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  const API =
    "https://test-api.ab.kg:8443/realms/wallet-watcher/protocol/openid-connect/token";

  async function handleLogin(formData, userName, navigate) {
    try {
      const res = await axios.post(API, formData);

      localStorage.setItem("tokens", JSON.stringify(res.data));
      localStorage.setItem("userName", userName);
      setCurrentUser(userName);
      console.log(res);
    } catch (e) {
      console.log(e);
      setError(e.response.data.detail);
    }
  }

  function logout() {
    localStorage.removeItem("tokens");
    setCurrentUser(null);
  }

  const value = { handleLogin, logout, currentUser, error, setError };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContext;

import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import $axios from "../axios";
import urlToken from "../const";

const authContext = createContext();
export const useAuthContext = () => useContext(authContext);

const AuthContext = ({ children }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // async function login(e) {
  //   e.preventDefault();

  //   axios
  //     .post(apiUrl, qs.stringify(requestData), {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     })
  //     .then((response) => {
  //       const authToken = response.data.access_token;
  //       console.log("Authentication Token:", authToken);

  //       navigate("/room");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       alert("Error");
  //     });
  // }

  async function login(credentials) {
    try {
      const { data: tokens } = await axios.post(urlToken, credentials);

      console.log(tokens);

      localStorage.setItem("tokens", JSON.stringify(tokens));

      const { data } = await $axios.get(urlToken);

      setUser(data);
    } catch (e) {
      console.log(e);
    }
  }

  function logout() {
    localStorage.removeItem("tokens");
    setUser(null);
  }

  async function checkAuth() {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      if (tokens) {
        const { data } = await $axios.get(urlToken);
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function activateUser(code) {
    try {
      const res = await $axios.post(urlToken, {
        code,
      });

      console.log(res, "code");
      navigate("/room");
    } catch (e) {
      console.log(e);
    }
  }
  const value = {
    navigate,
    login,
    logout,
    checkAuth,
    activateUser,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContext;

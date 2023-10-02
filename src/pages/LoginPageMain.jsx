import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const apiUrl =
  "https://test-api.ab.kg:8443/realms/wallet-watcher/protocol/openid-connect/token";

const LoginPageMain = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const requestData = {
    grant_type: "password",
    client_id: "wallet-watch-rest-api",
    username: user,
    password: password,
  };

  async function login(e) {
    e.preventDefault();

    axios
      .post(apiUrl, qs.stringify(requestData), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        const authToken = response.data.access_token;
        console.log("Authentication Token:", authToken);

        navigate("/room");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("ERROR");
      });
  }

  return (
    <div className="login-card">
      <div className="card-header">
        <div className="log">Личный кабинет</div>
      </div>
      <form onSubmit={login}>
        <div className="form-group">
          <label htmlFor="username">Имя пользователя:</label>
          <input
            required
            name="user"
            id="user"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            required
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Войти" />
        </div>
      </form>
    </div>
  );
};

export default LoginPageMain;

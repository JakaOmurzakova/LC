import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const accessToken = await getToken(user, password);
      console.log("Access Token:", accessToken);
      navigate("/room");
    } catch (error) {
      console.error("Login Error:", error);
      setError("Login failed. Please check your credentials.");
    }
  }

  async function getToken(user, password) {
    const requestBody = new URLSearchParams();
    requestBody.append("grant_type", "password");
    requestBody.append("client_id", "wallet-watch-rest-api");
    requestBody.append("username", user);
    requestBody.append("password", password);

    const response = await fetch(
      "https://test-api.ab.kg:8443/realms/wallet-watcher/protocol/openid-connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestBody.toString(),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const result = await response.json();
    const accessToken = result.access_token;
    console.log("access", accessToken);
  }

  return (
    <div className="login-card">
      <div className="card-header">
        <div className="log">Личный кабинет</div>
      </div>
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Имя пользователя</label>
          <input
            onChange={(e) => setUser(e.target.value)}
            name="username"
            id="username"
            type="text"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            type="password"
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

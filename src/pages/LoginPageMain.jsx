import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const LoginPageMain = () => {
  const { handleLogin, error, setError } = useAuthContext();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleAuth(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("userName", userName);
    formData.append("password", password);
    handleLogin(formData, userName, navigate);
  }

  useEffect(() => {
    setError(false);
  }, [setError]);

  return (
    <div className="login-card">
      <div className="card-header">
        <div className="log">Личный кабинет</div>
      </div>
      <form onSubmit={handleAuth}>
        <div className="form-group">
          <label htmlFor="username">Имя пользователя:</label>
          <input
            required
            name="username"
            id="username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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

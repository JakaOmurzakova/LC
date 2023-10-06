import React from "react";
import { useAuthContext } from "../context/AuthContext";

const LoginPageMain = () => {
  const { user, setUser, password, setPassword, login } = useAuthContext();

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
          <input type="submit" value="Войти" id="submit" />
        </div>
      </form>
    </div>
  );
};

export default LoginPageMain;

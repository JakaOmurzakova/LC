import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import keycloak from "./api/keycloak";
import axios from "axios";

//import axios from './api/api';
const LOGIN_URL = "/auth";

const LoginPage = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const qs = require("qs");
  let data = qs.stringify({
    grant_type: "password",
    client_id: "wallet-watch-rest-api",
    username,
    password,
  });

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://test-api.ab.kg:8443/realms/wallet-watcher/protocol/openid-connect/token",
        data,
        config
      );

      // Extract the access token from the response
      const { access_token } = response.data;

      // Initialize Keycloak with the access token
      keycloak.init({
        token: access_token,
        refreshToken: response.data.refresh_token,
        idToken: response.data.id_token,
        onLoad: "login-required",
      });
      console.log("Login successful");
      setSuccess(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="container">
            <div className="card">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />

                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <button>Sign In</button>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default LoginPage;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login: setAuthToken } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token = await login(email, password);
      if (!token) {
        throw new Error("Invalid email or password");
      }
      setAuthToken(token);

      navigate("/checks");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError("");
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange(setEmail)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange(setPassword)}
        />
        <button name="button" type="submit">
          Login
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;

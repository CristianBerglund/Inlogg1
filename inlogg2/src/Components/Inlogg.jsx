import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  let direction = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorTitle, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/signin",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response?.data?.status === "success") {
        localStorage.setItem("isAuthenticated", response.data.token);
        direction("/homepage");
      }
    } catch (error) {
      if (!error?.response) {
        setError("No server response");
      } else if (error.response.status === 400) {
        setError("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setError("Wrong email or password");
      } else {
        setError("Login Failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Log in</h3>
      <h5 className="red">{errorTitle}</h5>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <button type="submit" className="btn btn-dark btn-lg btn-block">
        Sign in
      </button>
    </form>
  );
}

export default Login;

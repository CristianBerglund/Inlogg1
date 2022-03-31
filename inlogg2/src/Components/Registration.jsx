import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SignUp() {
  
  let direction = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [errorTitle, setError] = useState("");

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (password.length < 8) {
      setError("Password must be atleast 8 characters");
    } else { 
      try { 
        const response = await axios.post("http://localhost:3001/auth/signup", 
        JSON.stringify({ password, email, firstname, lastname}),
        {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log(JSON.stringify(response))
        direction("/")

      }catch (error) { 
        if (!error?.response) {
          setError('No server response')
        }  else {
          setError('User already exist')
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
      <h5 className="red">{errorTitle}</h5>

      <div className="form-group">
        <label htmlFor="firstname">First name</label>
        <input
          type="text"
          id="firstname"
          name="First Name"
          className="form-control"
          placeholder="First name"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastname">Last name</label>
        <input
          type="text"
          id="lastname"
          name="Last Name"
          className="form-control"
          placeholder="Last name"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="Email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="Password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-dark btn-lg btn-block">
        Register
      </button>
    </form>
  );
}

export default SignUp;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../style/SignUp.css';
import chat from '../assets/image/chat.png';

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [fields, setField] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);

    fetch('http://127.0.0.1:8000/ChatApp/SignUp/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Signup failed. Please try again.");
        }
      })
      .then((data) => {
        console.log(data);
        setErrorMessage("");
        setSuccessMessage("Account created!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage("Email or username already exists. Please choose a different one.");
      });
  };

  const isFormValid = () => {
    if (!user.username || !user.email || !user.phoneNumber || !user.password) {
      if (!fields) {
        setField("Please fill all fields!");
      }
      return false;
    } else {
      if (fields) {
        setField("");
      }
      return true;
    }
  };

  return (
    <div className="mainContainer">
      <div className="login"><a href="/login">Login</a></div>
      <div className="head">
        <div>
          <img src={chat} alt="" />
        </div>
        <div>
          <h1>We_chat</h1>
          <h2>Create new account</h2>
          
          {fields && <p className="error">{fields}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <input
            type="text"
            placeholder="Username"
            value={user.username}
            name="username"
            onChange={handleChange}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Phone Number"
            value={user.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
          <br />
          <button type="submit" onClick={handleSubmit} disabled={!isFormValid()}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

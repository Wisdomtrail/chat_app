import React, { useState } from "react";
import chat from '../assets/image/chat.png';
import '../style/Login.css'
const Login = () => {

  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials)
    fetch('http://127.0.0.1:8000/ChatApp/Login/', {
      method: 'POST',
      headers: {'Content-type' : 'application/json'},
      body: JSON.stringify(credentials)
    }) 
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("SignIn failed. Please try again.");
      }
    })
    .then((data) => {
      console.log(data);
      setCredentials({
        username: '',
        password: '',
      });
    })    
   .catch((error) => {
      console.error('Error:', error);
      setErrorMessage("Incorrect username  or password");
    });
  }

  return (
    <div className="mainContainer">
        <div className="signUp"><a href="/">Sign Up</a></div>
      <center>
        <div className="loginBox">
          <div>
            <img src={chat} alt="" />
          </div>
          <div>
            <h1>We_chat</h1>
            <h2>Login</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
          <input type="username"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
          <br />
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </center>
    </div>
  );
};

export default Login;

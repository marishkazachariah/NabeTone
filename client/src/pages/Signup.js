import React from "react";
import { signup } from "../services/auth";
import { useState } from "react";

export default function Signup(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, password)
    .then(response => {
        console.log(response);
        if(response.message) {
            // reset the form
            setUsername('');
            setPassword('');
            // set the message
            setMessage(response.message);
        } else {
            // user is correctly signed up in the backend
            // add the user to the state of App.js
            props.setUser(response);
            // TODO: redirect to the audiofiles
            // for now it's just redirecting to home 
            props.history.push('/');
        }
    })
    .catch(err => console.log(err))
  };

  return (
    <>
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
        {message && <h3>{message}</h3>}
      </form>
    </>
  );
}

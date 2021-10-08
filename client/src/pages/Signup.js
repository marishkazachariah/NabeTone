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
      .then((response) => {
        console.log(response);
        if (response.message) {
          // reset the form
          setUsername("");
          setPassword("");
          // set the message
          setMessage(response.message);
        } else {
          // user is correctly signed up in the backend
          // add the user to the state of App.js
          props.setUser(response);
          props.history.push("/map");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#2a2d30" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10 ">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://images.unsplash.com/photo-1593769632597-e1c3dc2a9a93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2538&q=80"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Signup</h3>
                      <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <label htmlFor="username" className="form-label">Username: </label>
                        <input
                          type="text"
                          name="username"
                          className="form-control form-control-lg"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        </div>
                        <div className="form-outline mb-4">
                        <label htmlFor="password" className="form-label">Password: </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                        <button type="submit" className="btn btn-dark btn-lg btn-block">Sign up</button>
                        <br></br>
                        {message && <p
                            className="mb-5 pb-lg-2"
                            style={{ color: "#393f81" }}
                          >{message}</p>}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

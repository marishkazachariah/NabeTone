import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";

export default function Navbar(props) {
  const handleLogout = () => {
    logout().then(() => {
      props.setUser(null);
    });
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {props.user ? (
            <>
              <Link to="/my-tones" className="nav-link">
                <li className="nav-item">My Tones</li>
              </Link>
              {/* <Link to="/tones">
                <li>All Tones</li>
              </Link> */}
              <Link to="/tones/add" className="nav-link">
                <li className="nav-item">Add Tone</li>
              </Link>
              <Link to="/" onClick={() => handleLogout()} className="nav-link">
                <li className="nav-item">Logout</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <li className="nav-item-active">Home</li>
              </Link>
              <Link to="/signup" className="nav-link">
                <li className="nav-item">Signup</li>
              </Link>
              <Link to="/login" className="nav-link">
                <li className="nav-item">Login</li>
              </Link>
            </>
          )}
          <Link to="/map" className="nav-link">
            <li className="nav-item">Locate NodeTones</li>
          </Link>
        </ul>
        </div>
        </div>
      </nav>
    </>
  );
}

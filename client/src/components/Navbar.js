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
      <nav>
        <ul>
          {props.user ? (
            <>
              {/* Nice to have: Profile page */}
              {/* <Link to="/profile">
				<li>Profile</li>
			</Link> */}
              <Link to="/my-tones">
                <li>My Tones</li>
              </Link>
              <Link to="/tones">
                <li>All Tones</li>
              </Link>
              <Link to="/" onClick={() => handleLogout()}>
                <li>Logout</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/signup">
                <li>Signup</li>
              </Link>
              <Link to="/login">
                <li>Login</li>
              </Link>
            </>
          )}
          <Link to="#map">
            <li>Locate NodeTones</li>
          </Link>
        </ul>
      </nav>
    </>
  );
}

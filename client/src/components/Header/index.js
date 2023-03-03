import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";
import Navbar from "../Navbar/navbar.js"

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <div>
        <Navbar/>
        {/* <Link to="/">Home</Link>

        <div>
          {Auth.loggedIn() ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )} */}
        {/* </div> */}
      </div>
    </header>
  );
};

export default Header;

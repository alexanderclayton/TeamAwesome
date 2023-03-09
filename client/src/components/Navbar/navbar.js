import React, {useState } from 'react'
import Auth from "../../utils/auth";
import '../Navbar/navbar.css';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleDropdownButtonClick = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const handleLoginLogoutClick = () => {
    if (Auth.loggedIn()) {
      logout();
    } else {
      // Redirect to the login page
      window.location.href = '/login';
    }
  };

  const logout = () => {
    Auth.logout();
    // Reload the page to clear any cached data
    window.location.reload();
  };

  return (
    <nav>
      <ul className="navbar">
        <li><a href='/Home'>My Profile</a></li>
        {Auth.loggedIn() && (
          <li><button onClick={handleLoginLogoutClick}>Logout</button></li>
        )}
        {Auth.loggedIn() || (
          <li><Link to="/signup">Signup</Link></li>
        )}
        {Auth.loggedIn() ? null : (
          <li><Link to="/login">Login</Link></li>
        )}
        <li>
          <button 
            className="dropdown-button"
            onClick={handleDropdownButtonClick}
          >
            +
          </button>
          <div 
            className={`dropdown ${isDropdownActive ? 'active' : ''}`}
          >
            <a href="/PhotoAdd">Add a new photo</a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
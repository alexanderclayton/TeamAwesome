import React, { useState } from 'react';
import Auth from "../../utils/auth";
import '../Navbar/navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownActive, setIsDropdownActive] = useState(false);


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDropdownButtonClick = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const logout = () => {
    Auth.logout();
  };

  return (
    <nav>
      <ul className="navbar">
        <li><a href='/Home'>My Profile</a></li>
        {Auth.loggedIn() ? (
          <li><button onClick={logout}>Logout</button></li>
        ) : (
          <li><a href="/login">Login</a></li>
        )}
        <li>
          <form>
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery} 
              onChange={handleSearch} 
            />
            <button type="submit">Search</button>
          </form>
        </li>
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
            <a href="../client/src/pages/PhotoAdd.js">Add a new photo</a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
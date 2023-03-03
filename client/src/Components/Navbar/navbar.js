import React, { useState } from 'react';
import "./navbar.css"

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDropdownButtonClick = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  return (
    <nav>
      <ul className="navbar">
        <li><a href="#">My Profile</a></li>
        <li><a href="#">Logout</a></li>
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
            <a href="#">Add a new photo</a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
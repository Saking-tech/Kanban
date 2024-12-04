import React, { useState } from 'react';
import '../styles/header.css';

const Header = ({ grouping, sorting, onGroupingChange, onSortingChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="header">
      <div className="dropdown">
        <button className="dropdown-button" onClick={toggleDropdown}>
          <img src="./svgs/Display.svg" alt="Display" className="icon" />
          Display
          <img src="./svgs/down.svg" alt="Toggle menu" className="arrow" />
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <span>Grouping:</span>
              <select
                value={grouping}
                onChange={(e) => {
                  onGroupingChange(e.target.value);
                  setIsDropdownOpen(false); // Close dropdown on selection
                }}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <span>Ordering:</span>
              <select
                value={sorting}
                onChange={(e) => {
                  onSortingChange(e.target.value);
                  setIsDropdownOpen(false); // Close dropdown on selection
                }}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

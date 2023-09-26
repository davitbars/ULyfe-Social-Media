import React from 'react';
import { Link } from 'react-router-dom';
import UniMatchLogo from "../images/UniMatchLogo.png";


function Header() {
  return (
    <header>
      {/* Left Section */}
      <div className="header-left">
        {/* Add your logo here */}
        <img src={UniMatchLogo} alt="UniMatch Logo" className="logo" />
        {/* Page Options */}
        <nav>
          <ul>
            <li>
              <Link to="/screens/forum">Forum</Link>
            </li>
            <li>
              <Link to="/screens/dating">Dating</Link>
            </li>
            <li>
              <Link to="/screens/events">Events</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Right Section */}
      <div className="header-right">
        {/* Circular Account Button */}
        <Link to="/screens/account" className="account-button">
          {/* Place user photo here (e.g., <img src="user-photo.jpg" alt="User" />) */}
        </Link>
      </div>
    </header>
  );
}

export default Header;


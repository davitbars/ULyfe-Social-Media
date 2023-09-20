import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>UniMatch</h1>
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
          <li>
            <Link to="/screens/account">Account</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;


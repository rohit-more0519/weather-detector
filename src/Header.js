import React from 'react';
import { Link } from 'react-router-dom';

// Header component demonstrates JSX and React Router usage
function Header() {
  return (
    <header className="app-header">
      <h1>Weather Detect App <span role="img" aria-label="weather">☀️</span></h1>
      {/* React Router Links for navigation */}
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
    </header>
  );
}

export default Header;

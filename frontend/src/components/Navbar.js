import React from "react";
import "../App.css"; // or create Navbar.css if you prefer

const Navbar = ({ toggleMenu }) => {
  return (
    <nav className="App-navbar">
      {/* Menu icon / hamburger */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Site title */}
      <h1 className="navbar-title">Company Database Portal</h1>

      {/* Placeholder for future login/signup */}
      <div className="navbar-auth">
        {/* Example buttons for future use */}
        {/* <button>Login</button>
        <button>Sign Up</button> */}
      </div>
    </nav>
  );
};

export default Navbar;

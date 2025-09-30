import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Top Navbar */}
        <Navbar toggleMenu={toggleMenu} />

        {/* Body Layout */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar menuOpen={menuOpen} toggleMenu={toggleMenu} />

          {/* Main Content */}
          <Content />
        </div>
      </div>
    </Router>
  );
}

export default App;

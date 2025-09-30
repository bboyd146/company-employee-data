import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";  
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <Router>
      <div className="App">
        <Navbar toggleMenu={toggleMenu} />

        <div className="App-body">
          <Sidebar menuOpen={menuOpen} toggleMenu={toggleMenu} />
          <Content />
        </div>
      </div>
    </Router>
  );
}

export default App;


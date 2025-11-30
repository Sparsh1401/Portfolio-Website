import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import ReorderIcon from "@material-ui/icons/Reorder";

function Navbar() {
  const [expandNavbar, setExpandNavbar] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setExpandNavbar(false);
  }, [location]);

  return (
    <div className="navbar" id={expandNavbar ? "open" : "close"}>
      <div className="toggleButton">
        <button
          onClick={() => {
            setExpandNavbar((prev) => !prev);
          }}
        >
          <ReorderIcon />
        </button>
      </div>
      <div className="links">
        <Link to="/"> Home </Link>
        <a href="https://drive.google.com/file/d/1NnSmi8aOpmzpIf6yj6ycfAnsUfvfoYTc/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Resume</a>
        <Link to="/experience"> Experience </Link>
      </div>
    </div>
  );
}

export default Navbar;

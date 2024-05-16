import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link"; // Menggunakan HashLink
import logo from "../../Assets/Trip Plan.png";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`navbar-items ${isOpen ? "open" : ""} ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="menu-navbar">
        <div className="toggle-button" onClick={toggleMenu}>
          &#9776;
        </div>
        <ul className={`nav-menu ${isOpen ? "open" : ""}`}>
          <li>
            <Link smooth to="#bantuan">
              Bantuan
            </Link>
          </li>{" "}
          {/* Gunakan HashLink untuk navigasi ke bagian bantuan */}
          <li>
            <Link smooth to="#about">
              About
            </Link>
          </li>
          <li>
            <Link smooth to="/Login">
              Login
            </Link>
          </li>
          <li>
            <Link smooth to="/Register">
              Daftar
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

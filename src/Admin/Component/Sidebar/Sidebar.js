import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="wrap-sidebar">
      <div className="sidebar-logo">Trip Planner Admin</div>
      <div className="wrap-sidebar-nav">
        <ul className="side-nav">
          <li className="sidebar-item">
            <Link to="/Agen&Admin/Dashboard">Dashboard</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/Agen&Admin/Agen">Agen</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/Agen&Admin/Pengguna">Pengguna</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/Agen&Admin/Destinasi">Destinasi</Link>
          </li>
          <li className="sidebar-item dropdown">
            <span onClick={toggleDropdown}>Akomodasi</span>
            {showDropdown && (
              <ul className="dropdown-content">
                <li>
                  <Link to="/Agen&Admin/Hotel">Hotel</Link>
                </li>
                <li>
                  <Link to="/Agen&Admin/Transportasi">Transportasi</Link>
                </li>
                <li>
                  <Link to="/Agen&Admin/Kuliner">Kuliner</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="sidebar-item">
            <Link to="/Agen&Admin/Paket">Paket</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

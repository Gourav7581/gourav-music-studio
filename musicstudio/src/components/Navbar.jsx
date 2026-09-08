import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { clearPlayer } = usePlayer();
const handleLogout = () => {
   clearPlayer();
  localStorage.removeItem("token");

  navigate("/login");
};
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">

      {/* LEFT SIDE */}
      <div className="d-flex align-items-center gap-3">

        {/* LOGO */}
        <NavLink to="/" className="navbar-brand fw-bold text-success">
          🎵 Music Studio
        </NavLink>
      </div>

      {/* MOBILE TOGGLER */}
      <button
        className="navbar-toggler border-0"
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        aria-expanded={isDrawerOpen}
        aria-controls="navLinks"
        aria-label="Open navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* LINKS */}
      <div
        className={`collapse navbar-collapse ${isDrawerOpen ? "show" : ""}`}
        id="navLinks"
      >

        <div className="drawer-header d-lg-none">
          <span>Menu</span>
          <button
            type="button"
            className="drawer-close"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close navigation"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <ul className="navbar-nav mx-auto gap-lg-3">

          <li className="nav-item">
            <NavLink className="nav-link nav-hover" to="/home" onClick={() => setIsDrawerOpen(false)}>
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link nav-hover" to="/yourplaylist" onClick={() => setIsDrawerOpen(false)}>
              Your Playlist
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link nav-hover" to="/about" onClick={() => setIsDrawerOpen(false)}>
              About
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link nav-hover" to="/contact" onClick={() => setIsDrawerOpen(false)}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* RIGHT SIDE */}
        <div className="d-flex gap-2">

          <button className="btn btn-outline-light btn-sm rounded-pill px-3" onClick={()=>{navigate("/login");}}>
            Login
          </button>

          <button className="btn btn-success btn-sm rounded-pill px-3 fw-semibold" onClick={handleLogout}>
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

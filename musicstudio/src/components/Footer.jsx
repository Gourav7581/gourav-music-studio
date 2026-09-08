import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="modern-footer text-white">

      <div className="container py-5">

        <div className="row gy-4 align-items-start">

          {/* BRAND */}
          <div className="col-12 col-md-5">
            <h3 className="footer-brand">🎧 Music Studio</h3>

            <p className="text mt-2">
              A modern Spotify-inspired music player built with React.
              Smooth UI, clean design, and powerful audio experience.
            </p>

            {/* gradient line */}
            <div className="footer-glow-line"></div>
          </div>

          {/* LINKS */}
          <div className="col-6 col-md-3">
            <h6 className="footer-title">Explore</h6>

            <ul className="footer-links">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/search">Search</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="col-6 col-md-4">
            <h6 className="footer-title">Connect</h6>

            <div className="social-grid">

              <a href="#"><i className="bi bi-github"></i></a>
              <a href="#"><i className="bi bi-linkedin"></i></a>
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-envelope-fill"></i></a>

            </div>

            <p className="small text mt-3">
              Made with ❤️ using React
            </p>
          </div>

        </div>

        {/* bottom */}
        <div className="footer-bottom text-center mt-5">
          <small>
            © {new Date().getFullYear()} Music Studio — All rights reserved
          </small>
        </div>

      </div>
    </footer>
  );
}
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
          <Navbar />

    <div className="page-scroll bg-dark text-white ">


      <div className="container py-5 about-page">

        {/* HERO */}
        <div className="about-hero text-center text-white shadow-lg">

          <h1 className="fw-bold display-5 mb-3">
            About Music Studio 🎧
          </h1>

          <p className="lead opacity-75">
            A modern Spotify-inspired music player built with React,
            Context API, and HTML5 Audio — designed for smooth local music playback.
          </p>
        </div>

        {/* CARD 1 */}
        <div className="about-card">
          <h3>⚡ What is Music Studio?</h3>
          <p>
            Music Studio is a music player clone inspired by Spotify UI.
            It loads local MP3 files dynamically, organizes them into albums,
            and provides playback controls like play, pause, and skip in a modern dark UI.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="about-card">
          <h3>💻 Tech Stack</h3>

          <div className="d-flex flex-wrap gap-2 mt-3">
            {[
              "React 18",
              "React Router v6",
              "Bootstrap 5",
              "Context API",
              "HTML5 Audio API",
              "CSS Variables",
              "Flexbox",
            ].map((t) => (
              <span key={t} className="badge tech-badge">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CARD 3 */}
        <div className="about-card">
          <h3>📁 Project Structure</h3>
          <p>
            Songs are stored in <code className="text-success">public/songs/[album]</code>.
            Each album contains MP3 files and metadata. The app dynamically reads folders
            and builds playlists automatically.
          </p>
        </div>

        {/* CARD 4 */}
        <div className="about-card">
          <h3>👨‍💻 Developer</h3>
          <p>
            Built by <strong>PB</strong> as a learning project to explore React architecture,
            audio handling, and UI design patterns inspired by Spotify.
          </p>
        </div>

      </div>
      <Footer/>
    </div>
    </>
  );
}
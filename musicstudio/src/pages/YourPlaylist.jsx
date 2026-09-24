import React, { useEffect, useState } from "react";
import api from "../config/api";

import { usePlayer } from "../context/PlayerContext";
import AlbumCard from "../components/AlbumCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PlayBar from "../components/PlayBar";
import { useNavigate } from "react-router-dom";
export default function YourPlaylist() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);

  const { setSongs, playSong,  clearPlayer, } = usePlayer();

  useEffect(() => {
    fetchPrivateAlbums();
  clearPlayer()

  }, []);

  const fetchPrivateAlbums = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await api.get(
        "/api/private/albums",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlbums(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlayAlbum = (album) => {
    setSongs(album.songs);

    if (album.songs.length > 0) {
      playSong(album.songs[0]);
    }
  };

  return (
    <div className="home-layout">
      <Navbar />

      <div className="main-section">
        <Sidebar isOpen={true} />

        <div className="playlist-page">

          {/* Hero Section */}
        <div className="playlist-hero">
  <div className="d-flex justify-content-between align-items-center w-100">

    <div className="d-flex align-items-center">
      <div className="playlist-icon">
        <i className="bi bi-music-note-list"></i>
      </div>

      <div className="ms-3">
        <span className="playlist-label">
          PRIVATE PLAYLISTS
        </span>

        <h1 className="playlist-title">
          Your Music Collection
        </h1>

        <p className="playlist-subtitle">
          Your personal playlists created by you.
        </p>
      </div>
    </div>

    <button
      className="btn btn-success px-4 py-2"
      onClick={() =>
        navigate("/createyourplaylist")
      }
    >
      <i className="bi bi-plus-circle me-2"></i>
      Create Playlist
    </button>

  </div>
</div>

          {/* Albums */}
          <div className="playlist-section">

            <h4 className="section-title">
              My Playlists
            </h4>

            {albums.length === 0 ? (
              <div className="text-center py-5">
                <h5 className="text-light">
                  No Playlist Found 🎵
                </h5>

                <p className="text-secondary">
                  Create your first playlist.
                </p>
              </div>
            ) : (
              <div className="grid">
                {albums.map((album) => (
                  <AlbumCard
                    key={album._id}
                    title={album.title}
                    poster={album.poster}
                    onPlay={() =>
                      handlePlayAlbum(album)
                    }
                  />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      <PlayBar />
    </div>
  );
}

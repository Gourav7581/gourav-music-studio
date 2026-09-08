import React from "react";
import { usePlayer } from "../context/PlayerContext";

export default function Sidebar({ isOpen }) {
  const { songs, currentSong, playSong } = usePlayer();
  return (
    <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header">
        <h4>🎧 Your Library</h4>
      </div>

      <div className="sidebar-library">
        {songs.length === 0 ? (
          <div className="empty-state">
            No songs selected yet 🎵
          </div>
        ) : (
          songs.map((song) => (
            <div
              key={song._id}
              className={`song-item ${
                currentSong?._id === song._id
                  ? "active"
                  : ""
              }`}
              onClick={() => playSong(song)}
            >
              <span className="icon">🎵</span>

              <div className="song-info">
                <p className="song-name">
                  {song.title}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
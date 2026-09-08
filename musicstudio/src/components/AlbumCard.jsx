import React from "react";

export default function AlbumCard({
  title,
  poster,
  onPlay,
}) {
  return (
    <div
      className="album-card"
      onClick={onPlay}
    >
      <img src={poster} alt={title} />

      <h3>{title}</h3>

      <div className="play-btn">
        ▶
      </div>
    </div>
  );
}
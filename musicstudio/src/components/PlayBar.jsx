import React from "react";
import { usePlayer } from "../context/PlayerContext";

export default function PlayBar() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    formatTime,
    togglePlay,
    seekTo,
    changeVolume,
    toggleMute,
    playNext,
    playPrev,
  } = usePlayer();

  const seekPercent =
    duration > 0
      ? (currentTime / duration) * 100
      : 0;

  const handleSeekClick = (e) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const percent =
      ((e.clientX - rect.left) /
        rect.width) *
      100;

    seekTo(percent);
  };

  return (
    <div className="playbar">
      {/* Song Info */}
      <div className="playbar-song-info">
        <div className="song-thumb">
          <i className="bi bi-music-note-beamed" />
        </div>

        <div>
          <div className="playbar-song-name">
            {currentSong
              ? currentSong.title
              : "No song selected"}
          </div>

          <div className="playbar-song-artist">
            {currentSong
              ? "Now Playing"
              : ""}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="playbar-center">
        <div className="playbar-controls">
          <button
            className="ctrl-btn"
            onClick={playPrev}
          >
            <i className="bi bi-skip-start-fill" />
          </button>

          <button
            className="ctrl-btn play-main"
            onClick={togglePlay}
          >
            <i
              className={`bi ${
                isPlaying
                  ? "bi-pause-fill"
                  : "bi-play-fill"
              }`}
            />
          </button>

          <button
            className="ctrl-btn"
            onClick={playNext}
          >
            <i className="bi bi-skip-end-fill" />
          </button>
        </div>

        <div className="seekbar-wrapper">
          <span className="time-label">
            {formatTime(currentTime)}
          </span>

          <div
            className="seekbar-track"
            onClick={handleSeekClick}
          >
            <div
              className="seekbar-fill"
              style={{
                width: `${seekPercent}%`,
              }}
            />

            <div
              className="seekbar-thumb"
              style={{
                left: `${seekPercent}%`,
              }}
            />
          </div>

          <span className="time-label">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="playbar-right">
        <button
          className="ctrl-btn"
          onClick={toggleMute}
        >
          <i
            className={`bi ${
              isMuted
                ? "bi-volume-mute-fill"
                : "bi-volume-up-fill"
            }`}
          />
        </button>

        <input
          type="range"
          className="volume-slider"
          min="0"
          max="100"
          value={Math.round(volume * 100)}
          onChange={(e) =>
            changeVolume(
              Number(e.target.value)
            )
          }
        />
      </div>
    </div>
  );
}
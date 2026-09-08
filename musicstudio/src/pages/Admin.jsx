import React, { useState } from "react";
import axios from "axios";

function Admin() {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSongsChange = (e) => {
    setSongs(Array.from(e.target.files));
  };

  const handlePosterChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter playlist title");
      return;
    }

    if (!poster) {
      alert("Please select poster");
      return;
    }

    if (songs.length === 0) {
      alert("Please select songs");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("poster", poster);

      songs.forEach((song) => {
        formData.append("songs", song);
      });

      const response = await axios.post(
        "http://localhost:5000/api/create",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(response.data.message);

      setTitle("");
      setPoster(null);
      setSongs([]);

      document.getElementById(
        "posterInput"
      ).value = "";

      document.getElementById(
        "songsInput"
      ).value = "";
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed to create playlist"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "800px",
          margin: "auto",
          borderRadius: "20px",
        }}
      >
        <h2 className="mb-4 text-center">
          🎵 Create Playlist
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Playlist Title */}

          <div className="mb-3">
            <label className="form-label fw-bold">
              Playlist Title
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Party Songs"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />
          </div>

          {/* Poster */}

          <div className="mb-3">
            <label className="form-label fw-bold">
              Poster Image
            </label>

            <input
              id="posterInput"
              type="file"
              accept="image/*"
              className="form-control"
              onChange={
                handlePosterChange
              }
            />
          </div>

          {/* Songs */}

          <div className="mb-3">
            <label className="form-label fw-bold">
              Songs
            </label>

            <input
              id="songsInput"
              type="file"
              accept=".mp3,audio/*"
              multiple
              className="form-control"
              onChange={
                handleSongsChange
              }
            />
          </div>

          {/* Selected Songs */}

          {songs.length > 0 && (
            <div className="mb-4">
              <h5>
                Selected Songs (
                {songs.length})
              </h5>

              <div
                style={{
                  maxHeight: "220px",
                  overflowY: "auto",
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {songs.map(
                  (song, index) => (
                    <div
                      key={index}
                      className="mb-1"
                    >
                      🎵 {song.name}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading
              ? "Creating Playlist..."
              : "Create Playlist"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
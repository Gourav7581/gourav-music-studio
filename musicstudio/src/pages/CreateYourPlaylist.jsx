import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import Select from "react-select";
  import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


export default function CreateYourPlaylist() {
        const navigate = useNavigate();
    
  const [title, setTitle] =
    useState("");

  const [poster, setPoster] =
    useState(null);

  const [songs, setSongs] =
    useState([]);

  const [allSongs, setAllSongs] =
    useState([]);

  const [
    selectedSongs,
    setSelectedSongs,
  ] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const res =
        await axios.get(
          "http://localhost:5000/api/songs"
        );

      const options =
        res.data.data.map(
          (song) => ({
            label: song.title,
            value: song.file,
          })
        );

      setAllSongs(options);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePosterChange = (
    e
  ) => {
    setPoster(e.target.files[0]);
  };

  const handleSongsChange = (
    e
  ) => {
    setSongs(
      Array.from(e.target.files)
    );
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token =
      localStorage.getItem("token");

    const formData = new FormData();

    formData.append("title", title);

    if (poster) {
      formData.append(
        "poster",
        poster
      );
    }

    // uploaded songs
    songs.forEach((song) => {
      formData.append(
        "songs",
        song
      );
    });

    // dropdown songs
    formData.append(
      "selectedSongs",
      JSON.stringify(
        selectedSongs
      )
    );

    const res =
      await axios.post(
        "http://localhost:5000/api/private/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );
            navigate("/yourplaylist");

    toast.success(
      res.data.message
    );

    setTitle("");
    setPoster(null);
    setSongs([]);
    setSelectedSongs([]);
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data
        ?.message ||
        "Playlist creation failed"
    );
  }
};

  return (
    
    <div className="create-playlist-page">
      <Navbar />

      <div className="create-playlist-card">

        <h1 className="create-playlist-title">
          🎵 Create Your Playlist
        </h1>

        <p className="create-playlist-subtitle">
          Upload your own songs or
          select from the music
          library
        </p>

        <form
          onSubmit={
            handleSubmit
          }
        >
          {/* Title */}

          <div className="mb-4">
            <label className="dark-label">
              Playlist Title
            </label>

            <input
              type="text"
              className="form-control dark-input"
              placeholder="Party Songs"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />
          </div>

          {/* Poster */}

          <div className="mb-4">
            <label className="dark-label">
              Poster Image
            </label>

            <input
              type="file"
              className="form-control dark-input"
              accept="image/*"
              onChange={
                handlePosterChange
              }
            />
          </div>

          {/* Existing Songs */}

          <div className="mb-4">
            <label className="dark-label">
              Select Existing Songs
            </label>

            <Select
              isMulti
              classNamePrefix="react-select"
              options={
                allSongs
              }
              value={
                selectedSongs
              }
              onChange={
                setSelectedSongs
              }
              placeholder="Search Songs..."
            />
          </div>

          {/* Upload New Songs */}

          <div className="mb-4">
            <label className="dark-label">
              Upload New Songs
            </label>

            <input
              type="file"
              multiple
              accept=".mp3,audio/*"
              className="form-control dark-input"
              onChange={
                handleSongsChange
              }
            />
          </div>

          {/* Uploaded Songs */}

          {songs.length >
            0 && (
            <div className="mb-4">
              <h5 className="text-white mb-3">
                Uploaded Songs (
                {
                  songs.length
                }
                )
              </h5>

              <div className="song-box">
                {songs.map(
                  (
                    song,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                      className="song-item"
                    >
                      🎵{" "}
                      {
                        song.name
                      }
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Selected Songs */}

          {selectedSongs.length >
            0 && (
            <div className="mb-4">
              <h5 className="text-white mb-3">
                Selected Songs (
                {
                  selectedSongs.length
                }
                )
              </h5>

              <div className="song-box">
                {selectedSongs.map(
                  (
                    song,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                      className="song-item"
                    >
                      🎵{" "}
                      {
                        song.label
                      }
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="create-btn"
          >
            Create Playlist
          </button>
        </form>

      </div>
      <Footer/>

    </div>
  );
}
import React, { useEffect, useState } from "react";
import axios from "axios";

import { usePlayer } from "../context/PlayerContext";
import AlbumCard from "../components/AlbumCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PlayBar from "../components/PlayBar";

export default function Home() {
  const [albums, setAlbums] = useState([]);
  const { setSongs, playSong,clearPlayer,  setCurrentSong, } = usePlayer();

  useEffect(() => {
    fetchAlbums();
  clearPlayer();
  }, []);

  const fetchAlbums = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/albums"
      );

       const albumsData = res.data.data;

    setAlbums(albumsData);

    if (albumsData.length > 0) {
      setSongs(albumsData[0].songs);

      // sirf select karna hai
      if (albumsData[0].songs.length > 0) {
        setCurrentSong(
          albumsData[0].songs[0]
        );
      }
    }
    } catch (err) {
      console.log(err);
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

        <div className="home px-3 py-4">
          <div className="mb-4">
            <h1 className="fw-bold">
              Enjoy Music 🎧
            </h1>
            <p className="text mb-0">
              Pick your favorite album
            </p>
          </div>

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
        </div>
      </div>

      <PlayBar />
    </div>
  );
}
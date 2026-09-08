import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  // ========================= PLAY SONG

  const playSong = (song) => {
    if (!song?.file) {
      console.error("Cannot play song: audio file is missing");
      setIsPlaying(false);
      return;
    }

    const audio = audioRef.current;

    // Only replace the source when a different song is selected.
    // Replacing it on every play would reset the song to the beginning.
    if (audio.src !== new URL(song.file, window.location.href).href) {
      audio.src = song.file;
      audio.load();
    }

    setCurrentSong(song);

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) =>
        {
          console.error("Unable to play audio:", err);
          setIsPlaying(false);
        }
      );

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };
  };

  // ========================= PLAY NEXT

  const playNext = () => {
    if (!currentSong) return;

  const currentIndex = songs.findIndex(
  (song) =>
    song.file === currentSong.file
);
    if (
      currentIndex <
      songs.length - 1
    ) {
      playSong(
        songs[currentIndex + 1]
      );
    }
  };

  // ========================= PLAY PREVIOUS

  const playPrev = () => {
    if (!currentSong) return;

    const currentIndex =
      songs.findIndex(
        (song) =>
          song._id === currentSong._id
      );

    if (currentIndex > 0) {
      playSong(
        songs[currentIndex - 1]
      );
    }
  };

  // ========================= AUTO NEXT

  useEffect(() => {
    const audio = audioRef.current;

    audio.onended = () => {
      playNext();
    };
  }, [currentSong, songs]);

  // ========================= PLAY / PAUSE

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!currentSong) return;

    if (audio.paused) {
      // A song can be selected before its URL has been assigned to Audio.
      // In that case, initialize the source through playSong first.
      if (!audio.src || audio.src === window.location.href) {
        playSong(currentSong);
        return;
      }

      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Unable to resume audio:", err);
          setIsPlaying(false);
        });
    } else {
      audio.pause();

      setIsPlaying(false);
    }
  };

  // ========================= SEEK

  const seekTo = (percent) => {
    const audio = audioRef.current;

    audio.currentTime =
      (percent / 100) * duration;
  };

  // ========================= VOLUME

  const changeVolume = (
    value
  ) => {
    const audio = audioRef.current;

    audio.volume = value / 100;

    setVolume(value / 100);
  };

  // ========================= MUTE

  const toggleMute = () => {
    const audio = audioRef.current;

    audio.muted = !audio.muted;

    setIsMuted(audio.muted);
  };

  // ========================= INITIAL VOLUME

  useEffect(() => {
    audioRef.current.volume = 0.5;
  }, []);

  const clearPlayer = () => {
  const audio = audioRef.current;

  audio.pause();
  audio.currentTime = 0;
  audio.removeAttribute("src");
  audio.load();

  setSongs([]);
  setCurrentSong(null);

  setIsPlaying(false);
  setCurrentTime(0);
  setDuration(0);
};
  return (
    <PlayerContext.Provider
      value={{
        songs,
        setSongs,

        currentSong,
        setCurrentSong,

        isPlaying,
        currentTime,
        duration,

        volume,
        isMuted,

        playSong,
        playNext,
        playPrev,

        togglePlay,

        seekTo,
        changeVolume,
        toggleMute,

        formatTime,

    clearPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () =>
  useContext(PlayerContext);

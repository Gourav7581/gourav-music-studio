const PrivateAlbum = require(
  "../models/PrivateAlbum"
);

exports.createPrivateAlbum =
  async (req, res) => {
    try {
      const { title } = req.body;

      const poster =
        req.files.poster[0].filename;

      // uploaded songs
      const uploadedSongs =
        req.files.songs
          ? req.files.songs.map(
              (song) => ({
                title:
                  song.originalname.split(
                    "."
                  )[0],
                file:
                  song.filename,
              })
            )
          : [];

      // dropdown songs
      const selectedSongs =
        req.body.selectedSongs
          ? JSON.parse(
              req.body.selectedSongs
            ).map((song) => ({
              title: song.label,
              file: song.value
                .split("/songs/")[1],
            }))
          : [];

      const allSongs = [
        ...uploadedSongs,
        ...selectedSongs,
      ];

      await PrivateAlbum.create({
        user: req.user.id,
        title,
        poster,
        songs: allSongs,
      });

      res.status(201).json({
        success: true,
        message:
          "Private Playlist Created Successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  exports.getMyPrivateAlbums =
  async (req, res) => {
    try {
      const albums =
        await PrivateAlbum.find({
          user: req.user.id,
        });

      const updatedAlbums =
        albums.map((album) => ({
          _id: album._id,
          title: album.title,

          poster: `http://localhost:5000/images/${album.poster}`,

          songs: album.songs.map(
            (song) => ({
              title: song.title,

              file: `http://localhost:5000/songs/${song.file}`,
            })
          ),
        }));

      res.status(200).json({
        success: true,
        data: updatedAlbums,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
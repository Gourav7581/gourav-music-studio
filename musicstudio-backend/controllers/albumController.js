const Album = require("../models/Album");

const getBaseUrl = (req) =>
  process.env.PUBLIC_URL ||
  `${req.protocol}://${req.get("host")}`;

// ==========================================CREATE ALBUM
exports.createAlbum = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!req.files.poster) {
      return res.status(400).json({
        success: false,
        message: "Poster is required",
      });
    }

    const poster = req.files.poster[0].filename;

    const songs = req.files.songs
      ? req.files.songs.map((song) => ({
          title: song.originalname.split(".")[0],
          file: song.filename,
        }))
      : [];

    const album = await Album.create({
      title,
      poster,
      songs,
    });

    res.status(201).json({
      success: true,
      message:"PlayList Created Successfully"
      // data: album,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ========================================GET ALL ALBUMS
exports.getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    const baseUrl = getBaseUrl(req);

    const updatedAlbums = albums.map((album) => ({
      _id: album._id,
      title: album.title,

      poster: `${baseUrl}/images/${album.poster}`,

      songs: album.songs.map((song) => ({
        _id: song._id,
        title: song.title,
        file: `${baseUrl}/songs/${song.file}`,
      })),

      createdAt: album.createdAt,
      updatedAt: album.updatedAt,
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
// ======================================GET ALL SONGS
exports.getSongs = async (req, res) => {
  try {
    const albums = await Album.find();
    const baseUrl = getBaseUrl(req);

    const songs = albums.flatMap((album) =>
      album.songs.map((song) => ({
        title: song.title,
        file: `${baseUrl}/songs/${song.file}`,
      }))
    );

    res.status(200).json({
      success: true,
      data: songs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

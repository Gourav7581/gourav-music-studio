const mongoose = require("mongoose");

const privateAlbumSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    poster: {
      type: String,
      required: true,
    },

    songs: [
      {
        title: String,
        file: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PrivateAlbum",
  privateAlbumSchema
);
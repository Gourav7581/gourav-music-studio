const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
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

module.exports = mongoose.model("Album", albumSchema);
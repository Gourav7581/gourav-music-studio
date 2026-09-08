const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createAlbum,
  getAlbums,
  getSongs,
} = require("../controllers/albumController");

router.post(
  "/create",
  upload.fields([
    {
      name: "poster",
      maxCount: 1,
    },
    {
      name: "songs",
      maxCount: 100,
    },
  ]),
  createAlbum
);

router.get("/albums", getAlbums);

router.get("/songs", getSongs);

module.exports = router;
const router = require("express").Router();

const auth = require("../middleware/auth");

const upload = require("../middleware/upload");

const {
  createPrivateAlbum,
  getMyPrivateAlbums,
} = require(
  "../controllers/privateAlbumController"
);

router.post(
  "/private/create",
  auth,
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
  createPrivateAlbum
);

router.get(
  "/private/albums",
  auth,
  getMyPrivateAlbums
);

module.exports = router;
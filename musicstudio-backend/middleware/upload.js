const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "poster") {
      cb(null, "public/images");
    } else {
      cb(null, "public/songs");
    }
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1000000000) +
        path.extname(file.originalname)
    );
  },
});

module.exports = multer({ storage });
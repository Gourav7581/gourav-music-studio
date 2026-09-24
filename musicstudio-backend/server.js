const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.set("trust proxy", 1);

connectDB();

app.use(cors());
app.use(express.json());

app.use(
  "/images",
  express.static("public/images")
);

app.use(
  "/songs",
  express.static("public/songs")
);

app.use(
  "/api",
  require("./routes/albumRoutes")
);

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/",
  require("./routes/privateAlbumRoutes")
);

app.get("/", (req, res) => {
  res.send("Music Studio Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running On Port ${PORT}`
  );
});

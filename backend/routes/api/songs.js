const express = require("express");
const router = express.Router();

const {
  Song,
  Album,
  Playlist,
  PlaylistSong,
  User,
  Comment,
} = require("../../db/models");
const user = require("../../db/models/user");

router.get("/", async (req, res) => {
  let allSongs = await Song.findAll();
  res.json(allSongs);
});

//get songs of the current user
router.get("/current", async (req, res) => {
  let userId = req.user.id;
  const userSong = await Song.findAll({
    where: { userId: userId },
  });

  res.json(userSong);
});

router.get("/:songId", async (req, res, next) => {
  let songId = req.params.songId;

  let oneSong = await Song.findAll({
    where: { id: songId },
  });
  if (!oneSong.length) {
    const err = new Error();
    err.message = "Song couldn't be found";
    err.status = 404;
    next(err);
  }
  res.json(oneSong);
  next();
});

router.post("/", async (req, res, next) => {
  const { title, description, url, imageUrl, albumId } = req.body;
  let albumCheck = await Album.findOne({
    where: { id: albumId },
  });
  console.log(albumCheck);
  if (!albumCheck) {
    const err = new Error();
    err.message = "Album couldn't be found";
    err.status = 404;
    next(err);
    // res.status(404).json({
    // message: "Album couldn't be found",
    // statusCode: 404,
    // });
  } else {
    const newSong = await Song.create({
      title,
      description,
      url,
      imageUrl,
      albumId,
    });
    res.json(newSong);
  }
  next();
});

router.put("/:songId", async (req, res) => {
  let { songId } = req.params;
  let songToEdit = await Song.findOne({
    where: { id: songId },
  });
  const { title, description, url, imageUrl, albumId } = req.body;
  songToEdit.set(
    title,
    description,
    url,
    imageUrl,
    albumId
  )
  await songToEdit.save()
  res.json(songToEdit);
});

module.exports = router;

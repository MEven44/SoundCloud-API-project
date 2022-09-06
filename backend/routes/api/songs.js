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
const { restoreUser } = require("../../utils/auth.js");
const { requireAuth } = require("../../utils/auth.js");

router.get("/", async (req, res) => {
  let { size, page } = req.query;
  page = parseInt(page);
  size = parseInt(size);

  if (isNaN(size) || size < 1) {
    size = 20;
  }
  if (isNaN(page) || page < 1) {
    page = 1;
  }
  let pagination = {};
  if (page >= 1 && size >= 1) {
    if (size > 10) {
      size = 10;
    }
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }
  let allSongs = await Song.findAll({
    ...pagination,
  });
  res.json({
    songs: allSongs,
    page,
    size,
  });
});

//get songs of the current user

router.get("/current",requireAuth, restoreUser, async (req, res) => {
  let userId = req.user.dataValues.id;
  const userSong = await Song.findAll({
    where: { userId: userId },
  });

  res.json({
    songs: userSong,
  });
});


//get song by Id

router.get("/:songId", async (req, res, next) => {
  
   const { songId } = req.params;

   console.log(songId);
   const oneSong = await Song.findByPk(songId, {
     include: [
       { model: User, as: 'Artist', attributes: ["id", "username","imageUrl"] },
       { model: Album, attributes: ["id", "title", "imageUrl"] },
     ],
   });
  if (!oneSong) {
    const err = new Error();
    err.message = "Song couldn't be found";
    err.status = 404;
    next(err);
  }
  res.json({
    Songs:oneSong,
      
  });
  next();
});


//create a song (was wanting to add a unique url tho the tests wont allow it)


router.post("/", async (req, res, next) => {
  const { title, description, url, imageUrl, albumId } = req.body;
  if (albumId === null) {
    const newSong = await Song.create({
      userId: req.user.dataValues.id,
      title,
      description,
      url,
      imageUrl,
      albumId,
    });
    res.json(newSong);
  }

  let albumCheck = await Album.findByPk(albumId);
  if (albumCheck) {
    newSong = await Song.create({
      userId: req.user.dataValues.id,
      title,
      description,
      url,
      imageUrl,
      albumId,
    });
    res.json(newSong);
  } else {
    let albumCheck = await Album.findOne({
      where: { id: albumId },
    });
    if (!albumCheck) {
      const err = new Error();
      err.message = "Album couldn't be found";
      err.status = 404;
      next(err);
    }
  }
  next();
});

//comment with song Id
router.get("/:songId/comments", async (req, res, next) => {
  //require fixing
  let songId = req.params.songId;
  let comment = await Comment.findAll({
    where: { songId: songId },
    include: { model: User, attributes: ['id','username']}
  });

  if (comment.length) {
    res.json({'Comments': comment});
  } else {
    const err = new Error();
    err.message = "Couldn't find the comment";
    err.status = 404;
    next(err);
  }
});


//create a comment

router.post("/:songId/comments", requireAuth,restoreUser, async (req, res, next) => {
  let id = req.params.songId;
  const { body } = req.body;
  let song = await Song.findByPk(id); //checks if there is a song to comment about
  if (song) {
    const comment = await Comment.create({
      userId:req.user.dataValues.id,
      songId: id,
      body: body,
    });
    res.json(comment);
  } else {
    const err = new Error();
    err.message = "Couldn't find the song";
    err.status = 404;
    next(err);
  }
});

router.put("/:songId",requireAuth,restoreUser, async (req, res, next) => {
  let { songId } = req.params;
  let songToEdit = await Song.findAll({
    where: { id: songId },
    
  });
  if (songToEdit.length) {
    const { title, description, url, imageUrl } = req.body;
    songToEdit[0].set({
     
      title,
      description,
      url,
      imageUrl,
      
    });
    await songToEdit[0].save();
    let updatedSong = await Song.findByPk(songId)
    res.json(updatedSong);
  } else {
    const err = new Error();
    err.message = "Song couldn't be found";
    err.status = 404;
    next(err);
  }
  next();
});

router.delete("/:songId", async (req, res, next) => {
  let id = req.params.songId;
  let song = await Song.findByPk(id);
  if (song) {
    await song.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    const err = new Error();
    err.message = "song couldn't be found";
    err.status = 404;
    next(err);
  }
});

module.exports = router;

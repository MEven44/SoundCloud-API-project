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
  let userId = req.user.dataValues.id;
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
  if (albumId === null) { 
    const newSong = await Song.create({
    userId: req.user.dataValues.id,
    title,
    description,
    url,
    imageUrl,
    albumId,
  });
  res.json(newSong);}

  //comment with song Id

router.post('/:songId/comment', async (req,res)=>{
  let id = req.params.songId
  const {body} = req.body
  const comment = await Comment.create({
    songId: id,
    body: body
  })
res.json(comment)

});

  let albumCheck = await Album.findByPk(albumId)
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
  }else{
    let albumCheck = await Album.findOne({
      where: {id:albumId}
    });
    if (!albumCheck){
      const err = new Error();
      err.message = "Album couldn't be found";
      err.status = 404;
      next(err);
      }
  }
  next();
});

//comment with song Id

router.post('/:songId/comment', async (req,res)=>{
  let id = req.params.songId
  const {body} = req.body
  const comment = await Comment.create({
    songId: id,
    body: body
  })
res.json(comment)

});

router.put("/:songId", async (req, res, next) => {
  let { songId } = req.params;
  let songToEdit = await Song.findAll({
    where: { id: songId },
  });
  if (songToEdit.length) {
  const { title, description, url, imageUrl, albumId } = req.body;
  songToEdit[0].set({
    title,
    description,
    url,
    imageUrl,
    albumId
  }
  )
  await songToEdit[0].save()
  res.json(songToEdit[0]);
} else {
const err = new Error()
err.message = "Song couldn't be found";
err.status = 404
next(err)
}
next()
});


router.delete('/:songId', (req,res)=>{
  let song = req.params
  if (song) {
    song.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    const err = new Error()
    err.message = "Song couldn't be found";
    err.status = 404
  }
})



module.exports = router;

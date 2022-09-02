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

//get playlist by Id
router.get('/:playlistId', async (req,res,next)=> {
  let {playlistId} = req.params
  const playlist = await Playlist.findByPk(playlistId)
  if (!playlist) {
    const err = new Error();
    err.message = "Couldn't find playlist";
    err.status = 404;
    next(err)
  }else{
    res.json(playlist)
   
  }
  next()
})

//create a play list - missing errors, correct preview image (alias???) - it still doesn't work ????
router.post("/", async (req, res) => {

  const { name, previewImage } = req.body;
  let userId = req.user.id // gives me null
  
  const newPlaylist = await Playlist.create({
    userId: userId,
    name,
    previewImage,
    
  });

  res.json(newPlaylist);
});


router.post('/:playlistId/songs', async (req,res,next)=>{
    let {playlistId} = req.params
    const {songId} = req.body
    const updatePl = await PlaylistSong.findByPk(playlistId)
    if (updatePl) {
    updatePl.set({
        playlistId: playlistId,
        songId
    });
    updatePl.save()
    res.json(updatePl)
  } else {
    const err = new Error()
    err.message = "Couldn't find playlist"
    err.status = 404
    next(err)
  }
});

router.put("/:playlistId", async (req, res) => {
  let { playlistId } = req.params;
  let editPlaylist = await Playlist.findByPk(playlistId);

  const { name, previewImage} = req.body;

  if (!editPlaylist) {
    const err = new Error();
    err.message = "Playlist couldn't be found";
    err.status = 404;
    res.json(err);
  } else {
    editPlaylist.set({ name, previewImage});
    await editPlaylist.save();
    res.json(editPlaylist);
  }
});


router.get("/current", async (req, res) => {
  let {id} = req.user.dataValues;
  const userPL = await Playlist.findAll({
    where: { userId: userId },
  });

  res.json(userPL);
});

router.delete("/:playlistId", (req, res) => {
  let playlist = req.params;
  if (playlist) {
    playlist.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    const err = new Error();
    err.message = "playlist couldn't be found";
    err.status = 404;
  }
});
module.exports = router;
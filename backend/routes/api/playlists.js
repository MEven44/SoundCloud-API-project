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
//get playlist for current

router.get("/current", async (req, res) => {
  let { id } = req.user.dataValues;
  console.log(req.user);
  const userPL = await Playlist.findAll({
    where: { userId: id },
  });

  res.send(userPL);
});
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

//create a play list - preview image ?
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


router.post('/:playlistid/songs', async (req,res,next)=>{
    let {playlistid} = req.params
    console.log(playlistid)
    const {songId} = req.body
    const updatePl = await Playlist.findByPk(playlistid)
    if (updatePl) {
    let newSong =await  PlaylistSong.create({
        playlistId: playlistid,
        songId
    });
   
    res.json(newSong)
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



router.delete("/:playlistId", async (req, res,next) => {
  let id = req.params.playlistId
  let playlist = await Playlist.findByPk(id)
  if (playlist) {
    await playlist.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    const err = new Error();
    err.message = "playlist couldn't be found";
    err.status = 404;
    next(err)
  }
});
module.exports = router;
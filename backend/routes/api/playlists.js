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


router.post('/:playlistId/songs', async (req,res)=>{
    let {playlistId} = req.params
    const {songId} = req.body
    const updatePl = await PlaylistSong.create({
        playlistId: playlistId,
        songId
    });
    res.json(updatePl)
});



module.exports = router;
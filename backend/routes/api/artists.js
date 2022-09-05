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

//get artist details
router.get('/:userId', async (req,res,next)=>{
  let userId = req.params.userId
  console.log(userId)
  let artist = await User.findByPk(userId)
  if (artist) {
    res.json(artist)
  }else{
    const err = new Error()
    err.message = "Couldn't find the artist"
    err.status = 404
    next(err)
  }
})


//Get all Songs of an Artist from an id

router.get("/:artistId/songs", async (req, res,next) => {
  let id = req.params.artistId;
  console.log(id)
  let songById = await Song.findAll({ //getting all songs
    where: {userId:id},
  });
  let artist = await User.findByPk(id) //checks if the artist is in data base
  if (artist) {
      res.json(songById);
  } else {
    const err = new Error();
    err.message = "Artist couldn't be found";
    err.status = 404;
    next(err);
  }
});

//get all playlists from an artist/user ID

router.get('/:artistId/playlists', async (req,res,next)=> {
    let {artistId} = req.params
    let playlists = await Playlist.findAll({
      where: {userId:artistId}
    })
    if (playlists.length) {
    res.json(playlists) 
    } else {
      const err = new Error()
      err.message = "Artist couldn't be found"
      err.status = 404
      next(err)
    }
})




module.exports = router;

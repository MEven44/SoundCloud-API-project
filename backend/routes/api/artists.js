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


//Get all Songs of an Artist from an id

router.get("/:userId/songs", async (req, res,next) => {
  let userId = req.params.userId;
  let songById = await Song.findAll({
    where: { userId: id },
  });
  if (songById.length) {
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

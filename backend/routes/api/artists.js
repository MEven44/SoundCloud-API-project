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


router.get('/:userId', async (req,res,next)=>{
  let userId = req.params.userId
  
  let artist = await User.findByPk(userId,{
    include: [{
      model: Album
    },
    {
      model: Song
    }]
  })
  let totalSongs = await Song.count({
    where: {userId:userId}
  })
  let totalAlbum = await Album.count({
    where: {userId:userId}
})
  if (artist) {
    res.json({
     "id": artist.id,
     "username":artist.username,
     "previewImage": artist.imageUrl,
     "totalSongs": totalSongs,
     "totalAlbum": totalAlbum
    })
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

  let songById = await Song.findAll({ //getting all songs
    where: {userId:id},
  });
  let artist = await User.findByPk(id) //checks if the artist is in data base
  if (artist) {
      res.json({"Songs": songById});
  } else {
    const err = new Error();
    err.message = "Artist couldn't be found";
    err.status = 404;
    next(err);
  }
});

//get all playlists from an artist/user ID
//  {
//       "Playlists": [
//         {
//           "id": 1,
//           "userId": 1,
//           "name": "Current Favorites",
//           "createdAt": "2021-11-19 20:39:36",
//           "updatedAt": "2021-11-19 20:39:36",
//           "previewImage": "image url"
//         }
//       ]
//     }
router.get('/:artistId/playlists', async (req,res,next)=> {
    let artistId = req.params.artistId
    let playlists = await Playlist.findAll({
      where: {userId:artistId},
      
      })
     
    if (playlists.length) {
      let playlistArr = []
      for (let playlist of playlists) {
        playlistArr.push(playlist)
        // 'id':playlist.id,
        // 'userId':playlist.userId,
        // 'name':playlist.name,
        // 'createdAt': playlist.createdAt,
        // 'updatedAt':playlist.updatedAt,
        // 'previewImage':playlist.imageUrl
      } 
      res.json({'Playlists': playlistArr})
    } else {
      const err = new Error()
      err.message = "Artist couldn't be found"
      err.status = 404
      next(err)
    }
})




module.exports = router;

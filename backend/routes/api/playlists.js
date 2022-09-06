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
//  {
//       "id": 1,
//       "userId": 1,
//       "name": "Current Favorites",
//       "createdAt": "2021-11-19 20:39:36",
//       "updatedAt": "2021-11-19 20:39:36",
//       "previewImage": "image url",
//       "Songs": [
//         {
//           "id": 1,
//           "userId": 1,
//           "albumId": 1,
//           "title": "Yesterday",
//           "description": "A song about the past.",
//           "url": "audio url",
//           "createdAt": "2021-11-19 20:39:36",
//           "updatedAt": "2021-11-19 20:39:36",
//           "previewImage": "image url"
//         }
//       ]
//     }
router.get('/:playlistId', async (req,res,next)=> {
  let Id = req.params.playlistId
  const playlist = await Playlist.findByPk(Id)
  const songs = await Playlist.findByPk(Id, {
    include: {
      model: Song,
      through: {attributes: []}
    },
    exclude: Playlist
    })
  
  
console.log(Song)
  if (!playlist) {
    const err = new Error();
    err.message = "Couldn't find playlist";
    err.status = 404;
    next(err)
  }else{
    
    console.log(Song)
    res.json(songs)
   
  }
  next()
})

//create a play list 

router.post("/",requireAuth,restoreUser, async (req, res) => {

  const { name, imageUrl } = req.body;
  let userId = req.user.id 
  
  const newPlaylist = await Playlist.create({
    userId,
    name,
   imageUrl,
    
  });
  
  res.json(newPlaylist);
});


router.post('/:playlistid/songs', async (req,res,next)=>{
    let {playlistid} = req.params
   
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

  const { name, imageUrl } = req.body;

  if (!editPlaylist) {
    const err = new Error();
    err.message = "Playlist couldn't be found";
    err.status = 404;
    res.json(err);
  } else {
    editPlaylist.set({ name, imageUrl });
    await editPlaylist.save();
    res.json({
      'id':editPlaylist.id,
      'userId':editPlaylist.userId,
      'name' :editPlaylist.name,
      'createdAt':editPlaylist.createdAt,
      'editedAt':editPlaylist.updatedAt,
      'previewUrl':editPlaylist.imageUrl
  });
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
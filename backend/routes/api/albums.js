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
const { restoreUser } = require("../../utils/auth.js");
const { requireAuth } = require("../../utils/auth.js");

//get all albums

router.get("/", async (req, res) => {
  let allAlbums = await Album.findAll();
  res.json({Albums: allAlbums});
});


//create an album

router.post("/",requireAuth,restoreUser, async (req, res) => {
  const { title, description, imageUrl } = req.body;
  const newAlbum = await Album.create({
    userId: req.user.dataValues.id,
    title,
    description,
    imageUrl,
  });
  res.json(newAlbum);
});

//get albums of current user

router.get("/current",requireAuth,restoreUser, async (req, res) => {
  let userId = req.user.dataValues.id;
 
  const userAlbums = await Album.findAll({
    where: { userId: userId },
  });

  res.json({Albums:userAlbums});
});

//get an album by id

router.get("/:albumId", async (req, res, next) => {
  let albumId = req.params.albumId;

  let oneAlbum = await Album.findAll({
    where: { id: albumId },
    include: [
    {model: User, as: 'Artist', attributes:['id','username','imageUrl']},
    {
      model: Song      
    }]
  });

  if (!oneAlbum.length) {
    const err = new Error();
    err.message = "Album couldn't be found";
    err.status = 404;
    next(err);
  } else {
    res.json(oneAlbum[0]);
  }
  next();
});


//edit an album


router.put("/:albumId", async (req, res) => {
  let { albumId } = req.params;
  let albumToEdit = await Album.findByPk(albumId);

  const { title, description, imageUrl } = req.body;

  if (!albumToEdit) {
    const err = new Error()
    err.message = "Album couldn't be found"
    err.status = 404
    res.json(err)
  } else {

  albumToEdit.set({title, description, imageUrl});
  await albumToEdit.save();
  res.json(albumToEdit);
  }

});

// delete an album

router.delete("/:albumId", async (req, res, next) => {
  let id = req.params.albumId;
  let album = await Album.findByPk(id);
  if (album) {
    await album.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    const err = new Error();
    err.message = "Album couldn't be found";
    err.status = 404;
    next(err);
  }
});
module.exports = router;

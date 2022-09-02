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

router.put("/:commentId", async (req, res, next) => {
  let id = req.params.commentId;
  let comment = await Comment.findByPk(id);
  if (comment) {
    const { body } = req.body;
    comment.set({
      body,
    });
    res.json(comment);
  } else {
    const err = new Error();
    err.message = "Couldn't find comment";
    err.status = 404;
    next(err);
  }
});

router.delete("/:commentId", async (req, res, next) => {
  let id = req.params.commentId;
  let comment = await Comment.findByPk(id);
  if (comment) {
    comment.destroy();
    res.json("comment succesfully deleted");
    res.status = 200;
  }
});

module.exports = router;

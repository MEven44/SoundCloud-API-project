const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];
// Sign up
router.post(
  '/', validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName} = req.body;
    const user = await User.signup({ email, username, password,firstName, lastName });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);

//Get all Songs of an Artist from an id

router.get("/:userId/songs", async (req, res,next) => {
  let userId = req.params.id;
  if (id) {
      let songById = await Song.findAll({
        where: { userId: id },
      });
      res.json(songById);
  } else {
    const err = new Error("Artist couldn't be found");
    err.statusCode = 404;
    next(err);
  }
});

module.exports = router;

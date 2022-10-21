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
  async (req, res, next) => {
    const { email, password, username, firstName, lastName} = req.body;

    const existingUser = await User.findOne({
      where: {
        username
      }
    })
    if (existingUser) {
      const err = new Error("Signup failed");
      err.status = 403;
      err.title = "Signup failed";
      err.errors = ["This user name already exist"];
      return next(err);
    }
    const existingEmail = await User.findOne({
      where: {
        email
      }
    })
    if (existingEmail) {
      const err = new Error("Signup failed");
      err.status = 403;
      err.title = "Signup failed";
      err.errors = ["This Email already exist"];
      return next(err);
    }
    const user = await User.signup({ email, username, password,firstName, lastName });

    await setTokenCookie(res, user);

    return res.json(
      user
        
    );
  }
);


module.exports = router;

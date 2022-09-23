const express = require('express')
const router = express.Router();

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];


//log in?

router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The provided credentials were invalid."];
    return next(err);
  }

 const token =  await setTokenCookie(res, user);
  const userDetails = user.toJSON()
  userDetails.token = token

  return res.json({
    user:{
      'id': userDetails.id,
      'username': user.username,
      'firstName': user.firstName,
      'lastName': user.lastName,
      'email': user.email,
      'Token': userDetails.token,
    }
  });
});

router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
   
    return res.json({
     
      user: user.token = "",
      user: user.toSafeObject(), 
      
      
    });
  } else return res.json({});
});

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);


module.exports = router;
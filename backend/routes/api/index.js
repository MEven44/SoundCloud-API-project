const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");
const { requireAuth } = require("../../utils/auth.js");
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");


router.use(restoreUser);

router.get("/restore-user", (req, res) => {
  return res.json(req.user);
});

//POST test
router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

// GET /api/set-token-cookie test



router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Beethoven'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
});

// router.get ('/test/', (req,res)=>{
//   res.json('hello')
// })
router.use(restoreUser);

// ...

// GET /api/require-auth

router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});

module.exports = router;

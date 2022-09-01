
const router = require("express").Router();
//Routers
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js')
const albumsRouter = require('./albums')

const { restoreUser } = require("../../utils/auth.js");
const { requireAuth } = require("../../utils/auth.js");
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");



router.get("/restore-user", (req, res) => {
  return res.json(req.user);
});

router.use(restoreUser);
// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/songs', songsRouter);

router.use('/albums', albumsRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


//POST test
// router.post("/test", function (req, res) {
//   res.json({ requestBody: req.body });
// });

// GET /api/set-token-cookie test



// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Beethoven'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

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

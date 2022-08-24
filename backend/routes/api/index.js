const router = require("express").Router();

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

// router.get ('/test/', (req,res)=>{
//   res.json('hello')
// })

module.exports = router;

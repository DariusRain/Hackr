const express = require("express"),
  router = express.Router(),
  User = require("../models/user");


router.get("/", async (req, res) => {
  console.log("On user route");
  res.send("On root.");
});

router.get('/profile/:id', async (req, res) => {
    console.log('On Profile')
     await User.findOne({_id: req.params.id}).then(result => {
        console.log(5, result)
        res.render('user', {
          data: result
      }) 

    }).catch(err => {
     return res.status(500).json({
            message: 'Internal Server Error!'
        })
    })
    



})
module.exports = router;

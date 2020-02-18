





const express = require("express"),
  router = express.Router(),
  authCheck = require('./middleware/auth-check'),
  request = require('superagent'),
  User = require("../models/user"),
  Post = require("../models/post");
  


router.get("/", async (req, res) => {
  console.log("On user route");
  res.send("On root.");
});






router.get('/profile/:username', authCheck, async (req, res) => {
    console.log('On Profile')
   
    await User.findOne({user: req.params.username}).then(result => {
        res.render('user', {
          user: req.user
      }) 

    }).catch(err => {
     return res.status(500).json({
            message: 'Internal Server Error!'
        })
    })
    
router.get('/feed', authCheck, async (req, res) => {
    await Post.find().then(result => {
        return res.status(200).json(result)
      })
      .catch(err => {
        return res.status(500).json({
          message: 'Unable to obtain feed data.'
        })
      })
})
  



    router.post('/profile/:username', authCheck, async (req, res) => {

    const post = new Post({
      avatar: req.body.avatar.toString(),
      user: req.body.user.toString(),
      post: req.body.post.toString() 
    }) 
    console.log('Post', post)
    try {
      const savedPost = await post.save();
      console.log(savedPost)
      return res.status(201).json({
        message: "Post Submitted.",
      })
    }
    catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Post error."
      })
    }

  })


})
module.exports = router;

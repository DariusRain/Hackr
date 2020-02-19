





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
    await Post.find({}).then(result => {
      console.log(result)
        return res.status(200).send(result)
      })
      .catch(err => {
        return res.status(500).json({
          message: 'Unable to obtain feed data.'
        })
      })
})
  

  // router.put('/dislike/:username/:postid', async (req, res) => {

  //       await Post.findOne({_id: req.params.postid})
  //         .then(post => {
  //           if(!post.thumbdowns.indexOf(req.params.username)) {
  //             Post.updateOne()  
  //           }
            
  //         })

  // })

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

router.post('/post-it', async (req, res) => {
  const newPost = new Post({
    avatar: req.body.avatar,
    username: req.body.username,
    uid: req.body.uid,
    post: req.body.post
  });

  try {
    const savedPost = newPost.save();
      res.json(savedPost)
  }
  catch (err) {
    res.json(err)
    console.log(err)
  }
})

router.get('/profile/:uid/:username/live', async (req, res) => {
  if(await mongoose.isValidObjectId(req.params.uid) === true){
    await Post.find().then(result => {
      return res.status(200).json({feed: result})
    })
    .catch(err => {
      return res.status(500).json({message: err})
    })
  }else {
    return res.status(404).json({message: "Invalid ID and or Username"})
  }
})
module.exports = router;

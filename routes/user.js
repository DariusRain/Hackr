





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

    await User.findOne({user: req.params.username}).then(result => {
        res.render('user', {
          data: {
            username: req.user,
            accessToken: req.headers.cookie
          }
      }) 

    }).catch(err => {
     return res.status(500).json({
            message: 'Internal Server Error!'
        })
    })
  })
    
router.get('/feed', authCheck, async (req, res) => {
    await Post.find().then(result => {
      console.log(result)
        return res.status(200).send(result)
      })
      .catch(err => {
        return res.status(500).json({
          message: 'Unable to obtain feed data.'
        })
      })
})
  

router.put('/vote/:option/:postId', authCheck, async (req, res) => {

  const { option, postId } = req.params;
  console.log(option, req.user, postId)
  const username = req.user.user
  const post = await Post.findById(postId);
console.log(username)  
  const isNotInLike = await post.thumbups.indexOf(username) === -1

  const isNotInDislike = await post.thumbdowns.indexOf(username) === -1

  const isNotInEither = isNotInDislike && isNotInLike;
  
    try {
    switch(option) {

        case 'down-vote': 
        console.log(1, 'Dislike')  
        console.log(isNotInLike, isNotInDislike, isNotInEither)
        // IS not in either
        if (isNotInEither) {
          console.log( 'Is not in either');

            const update1 = await post.updateOne({$push: {thumbdowns: username}});
            res.send(1)

            // Is in not in dislike but is in like
          } else if (isNotInDislike && !isNotInLike) {
            console.log('Is not in but in other');

            const removeLike = await post.updateOne({$pull: {thumbups: username}})
            const update2 = await post.updateOne({$push: {thumbdowns: username}});
            res.send(1)

          } else if (!isNotInDislike){
            console.log( 'Allready In');

            const removeDislike = await post.updateOne({$pull: {thumbdowns: username}});          
            res.send(0)
          }
          break;

        case 'up-vote':
        // IS not in either
        if (isNotInEither) {
          console.log('Is not in either');
            
            const update1 = await post.updateOne({$push: {thumbups: username}});
            // Is in not in dislike but is in like
            res.send(1)
          } else if (isNotInLike && !isNotInDislike) {
            console.log('Is not in but in other');

            const removeLike = await post.updateOne({$pull: {thumbdowns: username}})
            const update2 = await post.updateOne({$push: {thumbups: username}});
            res.send(1)
          } else if (!isNotInLike){
            console.log( 'Allready In');

            const removeDislike = await post.updateOne({$pull: {thumbups: username}}); 
            res.send(0)
         
          }
          break;

        default:
        console.log( 'Forbidden Request (Like/Dislike)')
        res.send("0")
          break;

    } 
    
    
  } catch {
    console.log(4, 'Bad request (Like/Dislie)')
    res.redirect(`/user/profile/${username}`)


  }










  // try {
  //     const post = await Post.findOne({_id: req.params.postId});
  //     const option 
  //     const isInLike = await post.thumbsUp.every(user => {
  //       user != req.params.username
  //     })
  //     const checkArray = await post.thumbdowns.every( user => {
  //        user != req.params.username
  //       });
  //     console.log(checkArray)
  //     if(checkArray && !isInLike){
  //     const update = await Post.findByIdAndUpdate({_id: post._id}, { $push: { thumbdowns:  req.params.username} });  
  //     } else if(!checkArray) {

  //     }
  //     res.redirect(`../../user/profile/${username}`)

  //     }
  //     catch {
  //       console.log('Fail')
  //       res.redirect(`../../profile/${req.params.username}`)
  //     }
})

  router.post('/profile/:username', authCheck, async (req, res) => {
  
  const post = new Post({
    avatar: req.body.avatar.toString(),
    user: req.body.user.toString(),
    post: req.body.post.toString() 
  }) 


  console.log('Post', post)
  try {
    const findUser = await User.find({user: req.body.user.toString()})
    if(!findUser) {
      res.status(403).json({
        message: "Forbidden request"
      })
    }

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

router.get('/logout', authCheck, async (req, res) => {
    try {
      const user = await User.find({user: req.params.username});
      req.logout()
      res.redirect('/')
    } catch {
      res.status(403).json({message: "Forbidden"})
    }
})


module.exports = router;

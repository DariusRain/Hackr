const express = require('express'),
router = express.Router(),
passport = require('passport'),
User = require('../models/user');
router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    })
})

router.get('/github', passport.authenticate('github'))

router.get('/github/callback', passport.authenticate('github'), async (req, res) => {

    try {
    const userOnline = await User.findByIdAndUpdate(req.user._id, {$set: {online: true}})

    res.cookie("AccessToken", req.user.accessToken).redirect(`../../user/profile/${req.user.username}`)
    }
    catch {

  
            res.render('errors', { data : {message: "403 Forbidden"}  });

    }
}
)



module.exports = router;
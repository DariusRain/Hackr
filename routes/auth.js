const express = require('express'),
router = express.Router(),
passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    })
})
router.get('/github', passport.authenticate('github'))

router.get('/github/callback', passport.authenticate('github'), (req, res) => {
    res.redirect(`../../user/profile/${req.user.user}`)
}
)
















// const request = require('superagent')
// module.exports = (req, res, next) => {
// console.log('On callbbak')
//         const { query } = req;
//         const { code } = query;
//         console.log(code)
//         if(!code) {
//             return res.send({
//                 success: false,
//                 message: 'Error no code from git'
//             })
//         }
   
// request.post('https://github.com/login/oauth/access_token').send({
//     client_id: process.env.CLI_ID_GIT,
//     client_secret: process.env.CLI_SEC_GIT,
//     code: code
// }).set('Accept', 'application/json').then(result => {
//     const data = result.body;
//     res.send(data)

// })
// }

module.exports = router;
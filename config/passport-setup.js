//Passport setup for github
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy
const User = require('../models/user');

//Stuffing cookie in browser
passport.serializeUser((user, done) => {
        done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById({_id: id}).then(user => {
        done(null, id)
    })
})

passport.use(
    new GitHubStrategy({
        //Options
        clientID : process.env.CLI_ID_GIT,
        clientSecret : process.env.CLI_SEC_GIT,
        callBackURL: '/auth/signin/callback'
    }, 
    async (accessToken, refreshToken, profile, done) => {

        const newUser = new User({
            user: profile.username,
            git_id: profile.id,
            data: profile,
            online: true
        })

        try{
            const userExists = await User.findOne({git_id: profile.git_id}).then(user => {
                return user
            })
            if(!userExists){
            const saveUser = await newUser.save();
            return done(null, saveUser)
            }else {
            return done(null, userExists)
            }
            
        }
        catch (err) {
            return done(null, err)
        }
    })
)


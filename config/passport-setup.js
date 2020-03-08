//Passport setup for github
//http://www.passportjs.org/
const passport = require('passport');

//http://www.passportjs.org/packages/passport-github/
const GitHubStrategy = require('passport-github').Strategy


const User = require('../models/user');

//Stuffing cookie in browser


//Serialize user into a cookie
//This method inherits from the callback function in "new GitHubStrategy({...})""
//This sends the cookie to the browser.
//This method encrpyts the Mongoose ID from the inherited user Object.
passport.serializeUser((temp, done) => {
        done(null, temp.id)
})

//Deserialize cookie
//This method inherits from the browser cookie storage

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

passport.use(
    //Github strategy from passport-github dependency 
    new GitHubStrategy({
        //Options
        //Add your Github OAuth App information in the proper feilds.
        //See https://github.com/settings/developers > Create Oauth App if you havent, after doing so you will recoginize the proper feilds. 
        //See http://www.passportjs.org/packages/passport-github/ 
        clientID : process.env.CLI_ID_GIT,
        clientSecret : process.env.CLI_SEC_GIT,
        callBackURL: '/auth/github/callback'
    }, 
    //This asynchronous function verifies if the user has been allready stored in the database if not then it will call the next
    //call back function in order which in this case it is called "done" sort of like the "next" call back function for middleware.
    //The "done" call back function is refering to the "passport.serializeUser(...)" & "passport.deserializeUser(...)"  in the lines above.
    //So the values passed here those two functions inherit.
    async (accessToken, refreshToken, profile, done) => {
        //console.log(profile)
        const newUser = new User({
            user: profile.username,
            gitid: profile.id,
            online: true
        })
        await User.findOne({gitid: profile.id}).then(user => {
        
            if(!user){
            const user = newUser.save()
            let temp = {}
            temp.accessToken = accessToken
            temp.refreshToken = refreshToken
            temp.username = user.user
            temp.id = user._id
            console.log(1, user)        
            return done(null, temp)
            }else {
            let temp = {}
            temp.accessToken = accessToken
            temp.refreshToken = refreshToken
            temp.username = user.user
            temp.id = user._id               
            console.log(2, temp)
            return done(null, temp)
            }
            
    })
    })
)


//Passport setup for github
//http://www.passportjs.org/
const passport = require("passport");

//http://www.passportjs.org/packages/passport-github/
const GitHubStrategy = require("passport-github").Strategy;

const User = require("../models/user");

//Stuffing cookie in browser

//Serialize user into a cookie
//This method inherits from the callback function in "new GitHubStrategy({...})""
//This sends the cookie to the browser.
//This method encrpyts the Mongoose ID from the inherited user Object.
passport.serializeUser((user, done) => {
  done(null, user);
});

//Deserialize cookie
//This method inherits from the browser cookie storage

passport.deserializeUser(async (user, done) => {
  try {
    User.findById(user.id).then((user) => {
      done(null, user);
    });
  } catch (error) {
    return console.error(error);
  }
});

passport.use(
  //Github strategy from passport-github dependency
  new GitHubStrategy(
    {
      //Options
      //Add your Github OAuth App information in the proper feilds.
      //See https://github.com/settings/developers > Create Oauth App if you havent, after doing so you will recoginize the proper fields.
      //See http://www.passportjs.org/packages/passport-github/
      clientID: process.env.CLI_ID_GIT,
      clientSecret: process.env.CLI_SEC_GIT,
      callBackURL: `${process.env.API_ROOT}/auth/github/callback`,
    },

    //This verifies if the user has been allready stored in the database if not then it will call the next
    //call back function in order which in this case it is called "done" sort of like the "next" call back function for middleware.
    //The "done" call back function is refering to the "passport.serializeUser(...)" & "passport.deserializeUser(...)"  in the lines above.
    //So the values passed here those two functions inherit.
    async (accessToken, refreshToken, profile, cb) => {
      try {
        await User.findOrCreate({ githubId: profile.id }, (err, user) =>
          cb(err, { user, accessToken, refreshToken })
        );
      } catch (error) {
        return console.error(error);
      }
    }

    // async (accessToken, refreshToken, profile, done) => {
    //   try {
    //     //console.log(profile)
    //     user = await User.findOne({ gitid: profile.id });
    //     if (!user) {
    //       const newUser = new User({
    //         user: profile.username.trim(),
    //         gitid: profile.id,
    //         online: true,
    //       });

    //       user = await User.create(newUser);
    //       return done(null, { user, accessToken, refreshToken });
    //     }

    //     return done(null, { user, accessToken, refreshToken });
    //   } catch (error) {
    //     return console.error(error);
    //   }
    // }
  )
);

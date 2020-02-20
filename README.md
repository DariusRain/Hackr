# Oauth Branch 
# Hackr v1.0.2



<h3> [✔] Sign into Github and register for a Oauth application in the developer settings.</h3>
&nbsp;
<h3> [✔] Set the callback URL to the URL of one of your express route handlers (So github can redirect the user back to your app)
&nbsp;
<h3> [✔] Set the enviroment variables for the Client Id and Client Secret Obtained from Github</h3>
&nbsp;
<h3> [✔] Add Passport and Passport's Github Strategy.</h3>
<pre>
    //Passport setup for github
    //http://www.passportjs.org/
    
    const passport = require('passport');

    //http://www.passportjs.org/packages/passport-github/
    
    const GitHubStrategy = require('passport-github').Strategy

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
                console.log(1, user)
            const saveUser = newUser.save()
            return done(null, saveUser)
            }
            else {
            
            console.log(2, user)
            
            return done(null, user)
            }
            
    })
    })
)
</pre>
&nbsp;
<h3> [✔] Install cookie-session dependecy and use it as middleware in the main express file. & initialize a Passport session</h3>
<pre>

    //Setup Cookie session to store it on the client.

    const passport = require('passport'),
    const cookieSession = require('cokkie-session')

    server.use(cookieSession({
    maxAge: 24 * 60 * 60 * 10000,
    keys: [process.env.COOKIE_KEY]
    //NOTE: COOKIE_KEY is an enviroment envairable that contains a random string to encrypt the cookie.
    }))

    //Initialize passport & Allow session cookies

    server.use(passport.initialize())
    server.use(passport.session())


</pre>

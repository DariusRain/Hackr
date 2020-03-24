//index.js (Manin Server File)


// Imports
const express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  path = require('path'),
  auth = require('./routes/auth'),
  passport = require('passport'),
  cookieSession = require('cookie-session'),
  passportSetup = require('./config/passport-setup'),
  volleyball = require('volleyball');


// Express Application @server
const server = express();
const home = require("./routes/home");
const user = require("./routes/user");

// Set Pug View Engine
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'pug');
server.use(express.static("public"));

// Cors package & volleyball - to see requests in the console.
server.use(cors())
server.use(volleyball)

//  Stores a cookie as a session for a day
server.use(cookieSession({
  maxAge: 24 * 60 * 60 * 10000,
  keys: [process.env.COOKIE_KEY]
}))


//Initialize passport & Allow session cookies
server.use(passport.initialize())
server.use(passport.session())



// Routes & Middlewares
server.use(express.json());
server.use(express.urlencoded({extended: false}))


server.use("/", home);
server.use("/user", user);
server.use('/oauth', auth)



// Render 404 by default if none of the routes & middlewares above recognize the request.
server.use("/", (req, res, next) => {
  res.render('errors', {  data: { message: "404 Not found" } });
})
mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log(`Connected.`);
  }
);


// Set server to listen on port
const port = process.env.PORT;


server.listen(port, () => {
  console.log(`Listening on ${port}`);
});

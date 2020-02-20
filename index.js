//index.js (NEW)
const express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  path = require('path'),
  auth = require('./routes/auth'),
  passport = require('passport'),
  cookieSession = require('cookie-session'),
  passportSetup = require('./config/passport-setup'),
  volleyball = require('volleyball');
const server = express();
const home = require("./routes/home");
const user = require("./routes/user");


server.set('view engine', 'pug');
server.set('views', path.join(__dirname, 'views'))

//Stores a cookie as a session for a day
//NOTE: Enviorment variables are set from path "../../bash/set_dev_env.sh"
server.use(cookieSession({
  maxAge: 24 * 60 * 60 * 10000,
  keys: [process.env.COOKIE_KEY]
}))

//Initialize passport & Allow session cookies

server.use(passport.initialize())
server.use(passport.session())


server.use(cors())
server.use(express.json());
server.use(express.urlencoded({extended: false}))
server.use(volleyball)
server.use("/", home);
server.use("/user", user);
server.use('/auth', auth)
mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log(`Connected to Database`);
  }
);



server.listen(port, () => {
  console.log(`Listening on ${port}`);
});

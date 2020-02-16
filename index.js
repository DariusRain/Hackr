//index.js (NEW)
const express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  path = require('path'),
  volleyball = require('volleyball');
const server = express();
const home = require("./routes/home");
const user = require("./routes/user");

const corsOptions = {
  origin: '*',
  credentials: true 
};


server.set('view engine', 'pug');
server.set('views', path.join(__dirname, 'views'))
server.use(cors(corsOptions))
server.use(express.json());
server.use(express.urlencoded({extended: false}))
server.use(volleyball)
server.use("/", home);
server.use("/user", user);

mongoose.connect(
  "mongodb://localhost:27017/homework-febuary",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log(`Connected to Database`);
  }
);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});

//index.js (NEW)
const express = require("express"),
  mongoose = require("mongoose"),
  pug = require('pug'),
  cors = require("cors"),
  path = require('path')
const server = express();

const home = require("./routes/home");
const user = require("./routes/user");

server.use(express.static('public'))
server.set('view engine', 'pug');
server.set('views')
server.use(cors())
server.use(express.json());

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

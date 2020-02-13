//index.js (NEW)
const express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  port = process.env.PORT,
  db = process.env.DB;
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
  db,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log(`Connected to Database`);
  }
);



server.listen(port, () => {
  console.log(`Listening on ${port}`);
});

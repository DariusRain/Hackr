const express = require("express"),
  router = express.Router(),
  userModel = require("../models/user"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  tokenMware = require("../middleware/jwt"),
  SECRET_KEY = process.env.JWT_KEY;


  router.use(express.static('public'))


router.get("/", tokenMware.checkToken, async (req, res) => {
  console.log("On user route");
  res.send("On root.");
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const newUser = new userModel({
    username: `${req.body.username}`,
    password: bcrypt.hashSync(req.body.password),
    data: req.body.data
    });

  try {

    const savedUser = await newUser.save();
    const experation = 20 * 60 * 60;
    const accessToken = jwt.sign({ id: newUser._id }, SECRET_KEY, {
      expiresIn: experation
    });
    res.json({
      user: savedUser,
      access_token: accessToken,
      expiresIn: experation
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }


    res.json({message: 'Invalid Github Username'})
});

router.post("/login", async (req, res) => {
    const loginRequest = await userModel.findOne({username: req.body.username});
    
  try {
    const authenticate = await bcrypt.compare(req.body.password, loginRequest.password);
      if(loginRequest && authenticate){
        const id = loginRequest._id
        console.log(id)
        res.json({
         id: loginRequest._id
        })
      }
  }
  catch(err){
           //res.json({message: err})
           console.log(0)
  }
})

router.get('/profile/:id',  async (req, res) => {
    console.log('On Profile')
     await userModel.findOne({_id: req.params.id}).then(result => {
        console.log(5, result)
        res.render('user', {
            data: result
        })
    }).catch(err => {
     return res.status(500).json({
            message: 'Internal Server Error!'
        })
    })
    



})
module.exports = router;

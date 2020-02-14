const express = require("express"),
  router = express.Router(),
  User = require("../models/user"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  tokdenMware = require("./middleware/jwt");


  const { registerValidation, loiginValidation } = require("../validation");


router.get("/", async (req, res) => {
  console.log("On user route");
  res.send("On root.");
});

router.post("/signup", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userExists = await User.findOne({ username: req.body.username });
  if (userExists) return res.status(400).send("Username Exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  const user = new User({
    username: req.body.username,
    password: hashedPassword
  });
  
  try {
    const savedUser = await user.save();
    console.log(savedUser)
    res.status(201).send({user: user._id}); //Resolved
  } catch (err) {
    res.status(401).send(err); //Rejected
  }
});

router.post("/login", async (req, res) => {
    //Use the login validation Joi schema from the validation.js file
    const { error } = loiginValidation(req.body);
    if (error) return res.status(400).json({message: error.details[0].message});

    //Check if email is a email registered
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({message: "Ivalid Username and or Password"});  

    try{
    //Validate password with bcrypt.compare
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).json({message: "Invalid Username and or Password"})

    const token = jwt.sign({_id: user._id}, process.env.JWT_PASS)
    return res.header('auth-token', token).json(token)

    }
    catch (err) {
      console.log(err)
    }

    //Create and assin a token
    //Takes two arguments an object and a token secret
 
   // res.send('Logged in!')

})

router.get('/profile/:id', tokenMware, async (req, res) => {
    console.log('On Profile')
     await User.findOne({_id: req.params.id}).then(result => {
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

const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user.model");
const express = require("express");
const router = express.Router();

//this one calls the authentication middleware because auth is provided
router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/register", async (req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
  user.password = await bcrypt.hash(user.password, 10);// encoding the password
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    name: user.name,
    email: user.email
  });
});
router.post("/", async (req,res)=> {
    //loginin in.a
    // login failed
    // login succeeded
    //login a deactivated account.
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    // check the response
    if (user == null){
        // user doesnt exist.
        res.send("Incorrect Email and Password Combo");
    } else if (user.isDeactivated == true){
        // the users account is deactivated. they do not login 
        res.send("Your account has been deactivated. Contact admin at ---@admin.com");
    } else{
        //need to now check the password
  


    }



});

module.exports = router;
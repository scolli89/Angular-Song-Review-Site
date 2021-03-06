const express = require('express');
const router = express.Router();

const sanitizeHtml = require('sanitize-html');
const auth = require("../middleware/auth");

const bcrypt = require("bcrypt"); // outdated
const argon2 = require('argon2');
const { User, validate } = require("../models/user.model");


// Require the controllers WHICH WE DID NOT CREATE YET!!
const song_controller = require('../controllers/song.controller');
const review_controller = require('../controllers/review.controller');
// Secure
// this was a put, but i think it should be a post
router.post('/song',auth,song_controller.songCreate); // b. PUT /api/secure/song/ - save the JSON array for a song in the database and return the ID. 
//this was a post, but i think it should be a put
router.put('/song/:id',song_controller.songUpdate);

//reviews
router.post('/review',auth,review_controller.createReview);//:id',review_controller.createReview);


//for user registration and login
router.post("/login", async (req,res)=> {
    //loginin in.a
    // login failed
    // login succeeded
    //login a deactivated account.
    console.log('in /login');
    let user = await User.findOne({ email: req.body.email });
    console.log("db: ", user,"req: ",req.body);
    // check the response
    if (user == null){
        // user doesnt exist.
        res.send("Incorrect Email and Password");
    } else if (user.isDeactivated == true){
        // the users account is deactivated. they do not login 
        res.send("Your account has been deactivated. Contact admin at ---@admin.com");
    } else{
        //need to now check the password
        
        try {
            if(await argon2.verify(user.password,req.body.password)){
                //password match
                console.log("match");
                let b = {
                    email: req.body.email,
                    isAdmin: user.isAdmin
                };
                // create the token
                const token = user.generateAuthToken();
                // add the token to the header. Read it on the other side immediatly
                console.log ("token",token);
                res.header("Access-Control-Expose-Headers", "Authorization");//"x-auth-token");
                res.header("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-auth-token");
                let w = res.getHeaders.toString;
                
                res.header("Authorization",token).send({
                    _id: user._id,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isDeactivated: user.isDeactivated,
                    t:token
                });





               // res.send(b);
            } else{
                //password didn't match 
                res.send("Incorrect Email and Password");
            }
        } catch(err){
            console.log(err);
        }
    }
});

router.post("/register", async (req, res) => {
    console.log("in /register");
    // validate the request body first
    const { error } = validate(req.body); //ensure good inputs
    if (error) return res.status(400).send(error.details[0].message);
  
    //find an existing user
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) return res.status(400).send("User already registered.");
  
    user = new User({
      password: sanitizeHtml(req.body.password,{
          allowedTags:[],
          allowedAttributes:[],
          allowedIframeHostnames:[]
      }),
      email: sanitizeHtml(req.body.email,{
        allowedTags:[],
        allowedAttributes:[],
        allowedIframeHostnames:[]
    }),
      isAdmin: false,
      isDeactivated: false
    });
    try {
        user.password = await argon2.hash(user.password);
    } catch (err) {
        //...
    }
    //user.password = await bcrypt.hash(user.password, 10);// encoding the password
    await user.save();
  
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      isDeactivated: user.isDeactivated
    });
});
  
router.post("/current", auth, async (req, res) => {
    console.log("in /current");
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

module.exports = router;
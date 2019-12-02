
const Account = require('../models/account.model');
const { User, validate } = require("../models/user.model");
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Account Test controller!');
};

// open
// this function is not really used. 
exports.create_account = function (req,res){
    let account =new Account(
        {
            username: req.body.username,
            password: req.body.password,
            joinDate: req.body.joinDate,
            deactivate: req.body.deactivate
        }
    );

    account.save(function (err) {
        if(err) {
            return next(err);
        }
        res.send('Account created successsfully.')
    })
};


//admin:
//this funciton is used to change admin and deactivate privaleges
exports.changeUserSettings = function (req,res){ // /api/admin/deactivate/:id
    
    
    
    
    
    let id = req.body.userId;
    console.log(req.body.givenAdmin,req.body.givenDeactive);
    console.log(req.body.isAdmin,req.body.isDeactived)
    let b;
    //check what is being asked to be changed. 
    if (req.body.givenAdmin && req.body.givenDeactive){
        b={
            isAdmin: req.body.isAdmin,
            isDeactivated: req.body.isDeactived
        };
        console.log("in true true");
    } else if(req.body.givenAdmin && !req.body.givenDeactive){
        b={
            isAdmin: req.body.isAdmin
           
        };
    } else if(!req.body.givernAdmin && req.body.givenDeactive){
        b={
           
            isDeactivated: req.body.isDeactived
        };
    } else if(!req.body.givernAdmin && !req.body.givenDeactive){
        // no changes 
        return "no changes to be made";
    }
    console.log("body",b);
    console.log(req.body.userId);
    User.findByIdAndUpdate(req.body.userId, {$set: b}, function (err,account){
        if(err) return next (err);
        res.send('Account Updated');
    });
};

//returns all user data sans password
exports.getAllUsers = function (req,res){

    User.find({},function(err,user) {
        var userMap = [];//{};
        user.forEach(function(user){
            //don;t send the password
            user.password = null;
            //songMap[song._id] = song;
            userMap.push(user);
           // console.log(songMap[song._id]);
        });
        res.send(userMap); // send back all songs. 
    });

};
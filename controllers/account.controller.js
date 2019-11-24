const Song = require('../models/song.model');
const Account = require('../models/account.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Account Test controller!');
};

// open
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
        res.send('Account deactivated successsfully.')
    })
};


//admin:
exports.deactivate = function (req,res){ // /api/admin/deactivate/:id
    Account.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err,account){
        if(err) return next (err);
        res.send('Account deactived');
    });
};


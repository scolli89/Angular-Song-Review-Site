const Song = require('../models/song.model');
const Account = require('../models/account.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.song_create = function (req, res) {
    let song = new Song(
        {
            // name: req.body.name,
            // price: req.body.price
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            year: req.body.year,
           // comment: req.body.comment,
            submittedBy: req.body.submittedBy,
            submittedOn: req.body.submittedOn,
            numRatings: req.body.numRatings,
            avgRating: req.body.avgRating
        }
    );

    song.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Song Created successfully')
    })
};
// controllers/products.controller.js
exports.song_delete = function (req, res) {
    Song.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
exports.song_update = function (req, res) {
    Song.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, song) {
        if (err) return next(err);
        res.send('Song udpated.');
    });
};

exports.song_details = function (req, res) {
    Song.findById(req.params.id, function (err, song) {
        if (err) return next(err);
        res.send(song);
    })
};



//admin:
exports.copyright = function (req, res){ //router.get('/api/admin/copyright'
    res.send("This is the copyright command");
};
exports.deactivate = function (req,res){ // /api/admin/deactivate/:id
    let account =new Account(
        {
            username: req.body.username,
            deactivate: req.body.deactivate
        }
    );

    account.save(function (err) {
        if(err) {
            return next(err);
        }
        res.send('Account deactivated successsfully.')
    })
}

// Secure
router.post('/api/secure/song',song_controller.songCreate); // b. PUT /api/secure/song/ - save the JSON array for a song in the database and return the ID. 
exports.songCreate = function (req,res){
    let song = new Song(
        {
        title: req.body.tilte,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
        submittedBy: req.body.submittedBy,
        submittedOn: req.obdy.submittedOn,
        numRatings: req.body.numRatings,
        avgRating: req.body.avgRating
        }   
    );

    song.save(function(err))
};
router.put(' /api/secure/song/:id',song_controller.songUpdate); //c. POST /api/secure/song/:id - update the record of the given song ID with JSON array of properties sent in the body. d
router.put('/api/secure/addreview/:id',song_controller.songReviewCreate);
// open
router.get('/api/open/song',song_controller.getSongs);//GET /api/open/song - return a list of 10 songs ordered by average rating. Optionally, you may pass a query parameter to indicate the number of results to return. 
router.get('/api/open/search',song_controller.searchSongs); //e. GET /api/open/search - return a list of songs matching the search criteria provided as query parameters. 
router.get('/api/open/reviews/:id',song_controller.reviewSong);
router.get()


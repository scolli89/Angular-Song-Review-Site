const Song = require('../models/song.model');

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
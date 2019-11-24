const Review = require('../models/review.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Review Test controller!');
};

exports.getReview = function(req, res){
    Review.findById(req.params.id, function (err,review){
        if(err) return next(err);
        res.send(review);
        
    })
};

exports.createReview= function (req,res){
    let review = new Review({
        songId: req.body.songId,
        submittedBy: req.body.submittedBy,
        submittedOn: req.body.submittedOn,
        comment: req.body.comment,
        rating: req.body.rating
    });
    review.save(function (err){
        if(err) {
            return next(err);
        }
        res.send('Review Created successsfully');
    })
};
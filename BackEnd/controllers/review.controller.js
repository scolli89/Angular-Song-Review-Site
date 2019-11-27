const Review = require('../models/review.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Review Test controller!');
};

exports.getReview = function(req, res){
    Review.find({},function(err,review){
        var reviewMap = [];

        review.forEach(function(review){
            reviewMap.push(review); // every single review.
        });
        console.log("xxxxx");
        console.log(reviewMap);
        theSong = req.params.id; // the song we are trying to get reviews for
        x = [];// array we will send back
        for(i = 0; i< reviewMap.length;i++ ){
            if (reviewMap[i].songId == theSong){
                x.push(reviewMap[i]);
            }
        }

        console.log(x);
        res.send(x);
    });


    // Review.findById(req.params.id, function (err,review){
    //     if(err) return next(err);
    //     res.send(review);
        
    // })
};


exports.getSongs = function(req,res){
    
    Song.find({},function(err,song) {
        var songMap = [];
        song.forEach(function(song){
            
            //songMap[song._id] = song;
            songMap.push(song);
           // console.log(songMap[song._id]);
        });

        //find top ten songs.
        var x = []; // what we will end up sending
        res.send(x);
    });

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

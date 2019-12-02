const Review = require('../models/review.model');
const sanitizeHtml = require('sanitize-html');
const Song = require('../models/song.model');
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Review Test controller!');
};

exports.getReviewsOfSong = function(req, res){ // gets all the reviews of a song
    Review.find({},function(err,review){
        var reviewMap = [];

        review.forEach(function(review){
            reviewMap.push(review); // every single review.
        });
        console.log("xxxxx");
        console.log(reviewMap);
        theSong = req.body._id; // the song we are trying to get reviews for
        let x = [];// array we will send back
        for(i = 0; i< reviewMap.length;i++ ){ // add all the reviews of the song match
            if (reviewMap[i].songId == theSong){
                x.push(reviewMap[i]);
            }
        }

        console.log(x);
        res.send(x);
        console.log("After send");
    });


    // Review.findById(req.params.id, function (err,review){
    //     if(err) return next(err);
    //     res.send(review);
        
    // })
};

exports.getRecentReviews = function (req,res){
    Review.find({},function(err,review){
        var reviewMap = [];
        review.forEach(function(review){
            reviewMap.push(review);
        })
        // we have all the reviews
        let x = []; // this will return only the recent reviews of every song.
        reviewMap.sort(function(a,b){return b.submittedOn - a.submittedOn });
        
        console.log(reviewMap);

        console.log("CHECKING FOR same songs");

        for(var i = 0;i<reviewMap.length;i++){ // most recent value
            for(var j = 0; j<reviewMap.length;j++){ // value to remove
                if(reviewMap[i].songId == reviewMap[j].songId && i != j && reviewMap[j].songId != "REMOVE"){
                    console.log(reviewMap[j].songId);
                    reviewMap[j].songId = "REMOVE"; // add it to the do not send list. 
                }
            }
        }
        
        // remove the older versions
        console.log(reviewMap.length);
        for (var i = 0; i < reviewMap.length;i++){
            console.log("2nd"+ reviewMap[i].songId);
            if(reviewMap[i].songId != "REMOVE"){
                x.push(reviewMap[i]); // add the ones that are not to be removed.
            }
        }
        console.log(x);

        res.send(x);
    });
}

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



exports.createReview= async function (req,res){
    console.log("Email: ",req.body.submittedBy);
    let review = new Review({

        songId: sanitizeHtml(req.body.songId,{
            allowedTags:[],
            allowedAttributes:[],
            allowedIframeHostnames:[]
        }),
        submittedBy: sanitizeHtml(req.body.submittedBy,{
            allowedTags:[],
            allowedAttributes:[],
            allowedIframeHostnames:[]
        }),
    
        submittedOn: Date.now(),
        comment: sanitizeHtml(req.body.comment,{
            allowedTags:[],
            allowedAttributes:[],
            allowedIframeHostnames:[]
        }),
        rating: sanitizeHtml(req.body.rating,{
            allowedTags:[],
            allowedAttributes:[],
            allowedIframeHostnames:[]
        })
    });

    //console.log(review);
    // increment by 1, because 1 more rating
    console.log("number: ", req.body.theSong.numRatings );
    let num = req.body.theSong.numRatings + 1;
    console.log("number: ",num);
    //add the 
    console.log(req.body.theSong.totalRating,review.rating);
    let total = req.body.theSong.totalRating + review.rating;
    
    req.body.theSong.avgRating = total/num;
    req.body.theSong.numRatings = num;
    req.body.theSong.totalRating = total;
    console.log(req.body.theSong);

    await Song.findByIdAndUpdate(req.body.theSong._id, {$set: req.body.theSong}, function (err, song) {
        if (err) {
            console.log(err);
            return;}

        //res.send('Song udpated.');
    });
    

    review.save(function (err){
        if(err) {
            return next(err);
        }
        res.send('Review Created successsfully');
    })
};

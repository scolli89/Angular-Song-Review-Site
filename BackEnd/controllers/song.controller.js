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
            genre: req.body.genre,
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

// Secure
//router.post('/api/secure/song',song_controller.songCreate); // b. PUT /api/secure/song/ - save the JSON array for a song in the database and return the ID. 
exports.songCreate = function (req,res){
    let song = new Song(
        {
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            year: req.body.year,
           // comment: req.body.comment,
           genre: req.body.genre,
            submittedBy: req.body.submittedBy,
            submittedOn: req.body.submittedOn,
            numRatings: req.body.numRatings,
            avgRating: req.body.avgRating
        }   
    );

    song.save(function (err) {
        if(err) {
            return next(err);
        }
        res.send("Song created Successfully")
    })
};

exports.songUpdate = function (req, res) {
    Song.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, song) {
        if (err) return next(err);
        res.send('Song udpated.');
    });
};

exports.getSongs = function(req,res){
    
    Song.find({},function(err,song) {
        var songMap = [];//{};
        // [];//{};

        song.forEach(function(song){
            
            //songMap[song._id] = song;
            songMap.push(song);
           // console.log(songMap[song._id]);
        });

        //find top ten songs.
        var x = []; // what we will end up sending
        var y = []; 
        // sort the array 
        songMap.sort(function(a,b){return b.avgRating - a.avgRating });
        for(i = 0; i <songMap.length;i++){
            console.log(songMap[i].avgRating);
        }
        
        // add the top ten to x
        for(i = 0; i< 10;i++){
            x.push(songMap[i]);
        }
        console.log('x');
        for(i = 0; i <x.length;i++){
            console.log(x[i].avgRating);
        }
       // console.log(songMap);
        res.send(x);
    });
    // Song.findById(req.params.id, function (err, song) {
    //     if (err) return next(err);
    //     res.send(song);
    // })
};

exports.searchSongs = function(req,res){
    Song.find({},function(err,song){
        var songMap = []; // all the songs. 
        song.forEach(function(song){ 
            //songMap[song._id] = song;
            songMap.push(song);
           // console.log(songMap[song._id]);
        });
        // we now have every song. 
        //get the search parameters
        srTtl = req.body.title;
        srArt = req.body.artist;
        srAlb = req.body.album;
        srYr = req.body.year;
        srGnr = req.body.genre;
        // this is the 
        var x = [];
        
        // check if search parameters are good. 
        if((srTtl != "")||(srArt != "")||(srAlb != "")||(srYr != "")||(srGnr != 999)){ 
            // if any of the search parameters are not equal to the defualt values
            for(var i = 0; i< songMap.length;i++){
                if(songMap[i].title == srTtl|| songMap[i].artist ==srArt || songMap[i].album == srAlb||
                    songMap[i].year == Number(srYr)||songMap[i].genre == srGnr){
                        // if any of the parameters are match, add song to return array
                        x.push(songMap[i]);
                    }
            }


        }



        res.send(x);

    })
};

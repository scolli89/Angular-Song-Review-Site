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
        console.log(req.params);
        //console.log(req.body);
        //get the search parameters
        let srTtl = req.body.title;
        let srArt = req.body.artist;
        let srAlb = req.body.album;
        let srYr = req.body.year;
        let srGnr = req.body.genre;
        let srRate = req.body.avgRating;

        srTtl = String(srTtl);
        srArt = String(srArt);
        srAlb = String(srAlb);
        srYr = Number(srYr);
        srGnr = Number(srGnr);
        srRate = Number(srRate);

        // this is the 
        var x = [];
        
        // check if search parameters are good. 
        if(srTtl != ""){ 
            // if any of the search parameters are not equal to the defualt values
            for(var i = 0; i< songMap.length;i++){ // hard match first
                if(String(songMap[i].title).toLowerCase() == String(srTtl).toLowerCase()) {
                        // if any of the parameters are a match, add song to return array
                        x.push(songMap[i]);
                    console.log("Title Match " + songMap[i]);
                        
                }  
            }  
        } if(srArt != ""){
            for( var i = 0; i < songMap.length; i++){
                if(songMap[i].artist.toLowerCase() == srArt.toLowerCase()){
                    x.push(songMap[i]);
                    console.log("Artist Match " + songMap[i]);
                }
            }
        } if(srAlb != ""){
            for (var i = 0; i < songMap.length; i++){
                if(songMap[i].album.toLowerCase() == srAlb.toLowerCase()){
                    x.push(songMap[i]);
                    console.log("alm Match" + songMap[i]);
                }
            }
        } if( srGnr != 999){
            for( var i = 0 ; i < songMap.length;i++){
                if(songMap[i].genre == srGnr){
                x.push(songMap[i]);
                console.log("genre Match" + songMap[i]);
            }
        }
        } if( srYr != "" && srYr >= 1900 && srYr <= 2020){
            for(var i = 0; i< songMap.length; i++){
                if(Math.abs(srYr-songMap[i].year) <= 0){
                    x.push(songMap[i]);
                    console.log("Close year: " + songMap[i]);
                }
            }
        
        } if(srRate != ""){
            for(var i = 0; i<songMap.length; i++){
                console.log(srRate+ " : " + songMap[i].avgRating);
                if(srRate == songMap[i].avgRating){
                    x.push(songMap[i]);
                    console.log("Same Rating: " + songMap[i]);
                }
            }
        }
        //soft matching
        for(var i = 0; i< songMap.length;i++){
                 //soft matching on an keyword.
                // if itstarts with the same letter and matches the length within 3 characters
                //or the year is within 5 years
                console.log( "CLose Rating: " + Number(songMap[i].avgRating) + ":" + srRate);
         
            if ((songMap[i].title.startsWith(srTtl[0]) && Math.abs(songMap[i].title.length - srTtl.length) <=3) ||
                    (songMap[i].artist.startsWith(srArt[0]) && Math.abs(songMap[i].artist.length - srArt.length) <=3) ||
                    (songMap[i].album.startsWith(srAlb[0]) && Math.abs(songMap[i].album.length - srAlb.length) <=3) ||
                    (Math.abs(Number(songMap[i].year) - Number(srYr)) <= 3) ||(Math.abs(Number(songMap[i].avgRating) - srRate)<=1)){
                        console.log("soft match: "+ songMap[i]);
                        x.push(songMap[i]);
                }
                

        }
        // checking for duplicates.
        console.log("CHECKING FOR DUPLICATES");
        for(var i = 0; i< x.length ; i++){ // value to compare
            for(var j = 0; j <x.length ; j++){
                if(x[i] == x[j] && i != j){
                    console.log(i + " " +x[i].title)
                    console.log(j + " "+ x[j].title);
                    x.splice(j,1);
                    //delete x[j];
                }
            }

        }
        console.log(x);
        // deleting the null entries 
        
        res.send(x);
        });

        

    }


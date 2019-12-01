const Song = require('../models/song.model');
var stringSimilarity = require('string-similarity');
const sanitizeHtml = require('sanitize-html');
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.song_create = async function (req, res) {
    let song = new Song(
        {
            
            hdr: "TAG",
            title: sanitizeHtml(req.body.title,{
                allowedTags:[],
                allowedAttributes:[],
                allowedIframeHostnames:[]
            }),
            artist: sanitizeHtml(req.body.artist,{
                allowedTags:[],
                allowedAttributes:[],
                allowedIframeHostnames:[]
            }),
            album: sanitizeHtml(req.body.album,{
                allowedTags:[],
                allowedAttributes:[],
                allowedIframeHostnames:[]
            }),
            year: sanitizeHtml(req.body.year,{
                allowedTags:[],
                allowedAttributes:[],
                allowedIframeHostnames:[]
            }),
            comment: sanitizeHtml(req.body.commet,{
                allowedTags:[],
                allowedAttributes:[],
                allowedIframeHostnames:[]
            }),
            zeroByte: sanitizeHtml(req.body.zb,{
                allowedTags:[],
                allowedAttributes:[],
                allowedIframeHostnames:[]
            }),
            track: sanitizeHtml(req.body.track,{
                allowedTags:[],
                allowedAttributes:[],
                allowedIframeHostnames:[]
            }),
            genre: sanitizeHtml(req.body.genre,{
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
            numRatings: 0,
            avgRating: 0,
            totalRatings:0
        }
    );
    console.log(song);
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
            
            hdr: "TAG",
            title: sanitizeHtml(req.body.title,{
                allowedTags:['&'],
                allowedAttributes:[],
                allowedIframeHostnames:[]
            }),
            artist: sanitizeHtml(req.body.artist,{
                allowedTags:[],
                allowedAttributes:[],
                allowedIframeHostnames:[]
            }),
            album: sanitizeHtml(req.body.album,{
                allowedTags:[],
                allowedAttributes:[],
                allowedIframeHostnames:[]
            }),
            year: sanitizeHtml(req.body.year,{
                allowedTags:[],
                allowedAttributes:[],
                allowedIframeHostnames:[]
            }),
            comment: sanitizeHtml(req.body.commet,{
                allowedTags:[],
                allowedAttributes:[],
                allowedIframeHostnames:[]
            }),
            zeroByte: sanitizeHtml(req.body.zb,{
                allowedTags:[],
                allowedAttributes:[],
                allowedIframeHostnames:[]
            }),
            track: sanitizeHtml(req.body.track,{
                allowedTags:[],
                allowedAttributes:[],
                allowedIframeHostnames:[]
            }),
            genre: sanitizeHtml(req.body.genre,{
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
            numRatings: 0,
            avgRating: 0,
            totalRatings:0
        }  
    );
    console.log(song);

    song.save(function (err) {
        if(err) {
            console.log(err);
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

exports.getAllSongs = function (req,res){

    Song.find({},function(err,song) {
        var songMap = [];//{};
        song.forEach(function(song){
            
            //songMap[song._id] = song;
            songMap.push(song);
           // console.log(songMap[song._id]);
        });
        res.send(songMap); // send back all songs. 
    });

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
        console.log(song[1]);
        //console.log(req.body);
        //get the search parameters

        console.log("XXXXXXXXXXXXXXXXXXXX",req.body.keyword);
        if (req.body.keyword != undefined){
            // if you are keyword searching.
            let w = req.body.keyword;
            
            let words = w.trim().split(" ");
            


            console.log(words);
            var x = [];

            // loop through all the songs and compare the keyword to each of the values.
            //hard matching or contains
            for(var i = 0; i < songMap.length ; i++){
                for(var j = 0; j < words.length; j++ ){
                    if (songMap[i].hdr == words[j] || 
                        songMap[i].title == words[j] || songMap[i].title.indexOf(words[j]) != -1 ||
                        songMap[i].artist == words[j] || songMap[i].artist.indexOf(words[j]) != -1 ||
                        songMap[i].album == words[j]|| songMap[i].album.indexOf(words[j]) != -1 ||
                        songMap[i].genre == words[j]|| 
                        songMap[i].year == words[j]|| 
                        songMap[i].comment == words[j]|| songMap[i].comment.indexOf(words[j]) != -1||
                        songMap[i].track == words[j]){
                            console.log(words[j],songMap[i].hdr, songMap[i].title, songMap[i].title.indexOf(w[j]),
                                songMap[i].artist  , songMap[i].artist.indexOf(w[j]) ,
                                songMap[i].album , songMap[i].album.indexOf(w[j])  ,
                                songMap[i].genre , 
                                songMap[i].year , 
                                songMap[i].comment ,songMap[i].comment.indexOf(w[j]) ,
                                songMap[i].track) ;
                            x.push(songMap[i]);
                            console.log("hard match, ",songMap[i].title)
                        }



                }
                
            }
            //soft matching
            for(var i = 0; i<songMap.length;i++){
                for(var j = 0; j<songMap.length;j++){
                    if ((stringSimilarity.compareTwoStrings(songMap[i].title.toLowerCase(), String(words[j]).toLowerCase())>=0.5) ||
                    (stringSimilarity.compareTwoStrings(songMap[i].artist.toLowerCase(), String(words[j]).toLowerCase())>=0.5) ||
                    (stringSimilarity.compareTwoStrings(songMap[i].album.toLowerCase(), String(words[j]).toLowerCase())>=0.5) ||
                    (stringSimilarity.compareTwoStrings(songMap[i].comment.toLowerCase(), String(words[j]).toLowerCase())>=0.5) ||
                    (Math.abs(Number(songMap[i].year) - Number(words[i])) <= 3) ||
                    (Math.abs(Number(songMap[i].avgRating) - Number(words[i])) <= 1)){

                        console.log( stringSimilarity.compareTwoStrings(songMap[i].title.toLowerCase(), String(words[j]).toLowerCase()));
                        console.log( stringSimilarity.compareTwoStrings(songMap[i].artist.toLowerCase(), String(words[j]).toLowerCase()));
                        console.log(stringSimilarity.compareTwoStrings(songMap[i].album.toLowerCase(), String(words[j]).toLowerCase() ));
                        console.log(stringSimilarity.compareTwoStrings(songMap[i].comment.toLowerCase(), String(words[j]).toLowerCase() ));
                        console.log(Math.abs(Number(songMap[i].year) - Number(words[i]) ));
                        console.log(Math.abs(Number(songMap[i].avgRating) - Number(words[i])));

                        x.push(songMap[i]);
                    }



                }
            }
          


        }
        else { // else you are regular searching
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
        
        // checking for exact matches
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
        
            } if(srRate != 999 && srYr >= 0 && srYr <= 5){
                for(var i = 0; i<songMap.length; i++){
                    console.log(srRate+ " : " + songMap[i].avgRating);
                    if(srRate == songMap[i].avgRating){
                        x.push(songMap[i]);
                        console.log("Same Rating: " + songMap[i]);
                    }
                }
            }
        //soft matching 60% threshold
            console.log("SOFT MATCHING");
            for(var i = 0; i< songMap.length;i++){
                 //soft matching on an keyword.
                // if itstarts with the same letter and matches the length within 3 characters
                //or the year is within 5 years
                console.log( "CLose Rating: " + Number(songMap[i].avgRating) + ":" + srRate);
         
            // if ((songMap[i].title.startsWith(srTtl[0]) && Math.abs(songMap[i].title.length - srTtl.length) <=3) ||
            //         (songMap[i].artist.startsWith(srArt[0]) && Math.abs(songMap[i].artist.length - srArt.length) <=3) ||
            //         (songMap[i].album.startsWith(srAlb[0]) && Math.abs(songMap[i].album.length - srAlb.length) <=3) ||
            //         (Math.abs(Number(songMap[i].year) - Number(srYr)) <= 3) ||(Math.abs(Number(songMap[i].avgRating) - srRate)<=1)){
            //             console.log("soft match: "+ songMap[i]);
            //             x.push(songMap[i]);
            // }
                if ((stringSimilarity.compareTwoStrings(songMap[i].title.toLowerCase(),srTtl.toLowerCase())>= 0.5) ||
                    (stringSimilarity.compareTwoStrings(songMap[i].artist.toLowerCase(),srArt.toLowerCase())>= 0.5) ||
                    (stringSimilarity.compareTwoStrings(songMap[i].album.toLowerCase(),srAlb.toLowerCase())>= 0.5)||
                    (Math.abs(Number(songMap[i].year) - Number(srYr)) <= 3) ||
                    (Math.abs(Number(songMap[i].avgRating) - srRate)<=1)){
                        console.log(songMap[i].title);
                        console.log("Title Soft: " + stringSimilarity.compareTwoStrings(songMap[i].title.toLowerCase(),srTtl.toLowerCase()));
                        console.log("artist Soft: " + stringSimilarity.compareTwoStrings(songMap[i].artist.toLowerCase(),srArt.toLowerCase()));
                        console.log("album Soft: " + stringSimilarity.compareTwoStrings(songMap[i].album.toLowerCase(),srAlb.toLowerCase()));
                        console.log(Math.abs(Number(songMap[i].year) - Number(srYr)));
                        console.log(Math.abs(Number(songMap[i].avgRating) - srRate));
                        x.push(songMap[i]);
                } 

            }
        // checking for duplicates.
            
        // useless
        var similarity = stringSimilarity.compareTwoStrings('healed', 'sealed'); 
        var matches = stringSimilarity.findBestMatch('healed', ['edward', 'sealed', 'theatre']);



        }

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

        
        res.send(x);
        });
}
    
 
    

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
    hdr: {type:String, default: "TAG"},
    title: {type: String, required: true, max: 30},
    artist: {type: String, required: true,max: 30},
    album: {type:String,required: false,max: 30},
    year: {type:String, required: false,max:4},
    comment: {type:String,required: false,max: 28,default: ""},
    zeroByte: {type:Boolean,required:false, defult:1}, // if 0 track number is the track number , if 1, track number is measning less.
    track:{type:Number,required:false,default:0},
    genre:{type:Number,require: false,min:0,max:191},
    submittedBy: {type:String,required:true},
    submittedOn: {type:Date,required: true, default: Date.now},
    numRatings: {type:Number,required:true, default:0},
    totalRating: {type:Number,required:true,default:0},
    avgRating: {type:Number,require:true, default:0,min:0,max:5}
});

// Export the model
module.exports = mongoose.model('Song', SongSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
    title: {type: String, required: true, max: 30},
    artist: {type: String, required: true,max: 30},
    album: {type:String,required: true,max: 30},
    year: {type:String, required: true,max:4},
    genre:{type:Number,require: true,min:0,max:191},
    submittedBy: {type:String,required:true},
    submittedOn: {type:Date,required: true, default: Date.now},
    numRatings: {type:Number,required:true, default:0},
    totalRatings: {type:Number,required:true,default:0},
    avgRating: {type:Number,require:true, default:0,min:0,max:5}
});

// Export the model
module.exports = mongoose.model('Song', SongSchema);
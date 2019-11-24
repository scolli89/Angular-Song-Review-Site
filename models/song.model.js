const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
    title: {type: String, required: true, max: 30},
    artist: {type: Number, required: true,max: 30},
    album: {type:String,required: true,max: 30},
    year: {type:Number, required: true,max:4},
    submittedBy:{type:String,required:true},
    submittedOn:{type:Date,required:true, default:Date.now},
    numRatings:{type:Number,required:true,default:0},
    avgRating:{type:Number,required: true,default:3,min:1,max:5}
});

// Export the model
module.exports = mongoose.model('Song', SongSchema);
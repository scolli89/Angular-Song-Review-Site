const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    title: {type: String, required: true, max: 30},
    submittedBy:{type:String,required:true},
    submittedOn:{type:Date,required:true, default:Date.now},
    review:{type:String,required:true,max: 250},
    rating:{type:Number,required: true,default:3,min:1,max:5}
});

// Export the model
module.exports = mongoose.model('Song', ReviewSchema);
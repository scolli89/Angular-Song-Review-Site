const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    songId: {type: String, required: true},
    submittedBy: {type:String,required:true},
    submittedOn: {type:Date,required: true, default: Date.now},
    comment: {type:String,required:true,max: 100},
    rating: {type:Number,required: true,min:1,max:5}
});

// Export the model
module.exports = mongoose.model('Review', ReviewSchema);
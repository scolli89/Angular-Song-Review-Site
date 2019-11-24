const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AccountSchema = new Schema({
    username: {type: String, required: true, max: 30},
    password: {type: String, required: true,max: 30},
    joinDate: {type:Date,required: true, default: Date.now},
    deactivated: {type: Boolean,required: true, default:false}
});

// Export the model
module.exports = mongoose.model('Account', AccountSchema);
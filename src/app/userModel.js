var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: { type: Number, required: true},
    subject: { type: String, required: true },
    question: { type: String, required: true },
    options: [{ type: [String], required: true }],
    correct_option: { type: String, required: true },
    difficulty_level: { type: Number, required: true },
});

const userModel = mongoose.model('questions', userSchema);
module.exports = userModel;
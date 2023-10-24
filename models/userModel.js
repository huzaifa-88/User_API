const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    'FullName' : String,
    'UserEmail' : String,
    'Contact' : String,
    'Password':String,
}, {timestamps : true});


module.exports = mongoose.model('User', userSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String, Required: true, min: 5, max: 255 },
    email:    { type: String, Required: true, max: 255},
    password: { type: String, Required: true, min: 6, max: 500},
    dateOfBirth: { type: Date, Required: true},
    updatedAt : { type: Date, default: Date.now },
    createdAt : { type: Date, default: Date.now }

});

module.exports =  mongoose.model('User', userSchema);
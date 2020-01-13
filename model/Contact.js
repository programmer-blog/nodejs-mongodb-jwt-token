var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { registerValidation, loginValidation } = require('../validation');

var contactSchema = new Schema({
    name: { type: String, Required: true, min: 5, max: 255 },
    phone: { type: String, Required: true, min: 10, max: 20},
    email: { type: String, Required: true, max: 255},
    address: { type: String},
    updatedAt : { type: Date, default: Date.now },
    createdAt : { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Contact', contactSchema);
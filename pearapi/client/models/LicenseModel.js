const {Schema, model} = require('mongoose');

const License = new Schema({
    time: {type: String, unique: false, required: true},
    hwid: {type: String, unique: false, required: true},
    pkey: {type: String, unique: false, required: true},
});

module.exports = model('license', License);
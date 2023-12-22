const {Schema, model} = require('mongoose');

const Version = new Schema({
    time: {type: String, unique: false, required: true},
    version: {type: String, unique: false, required: true},
    hash: {type: String, unique: false, required: true},
});

module.exports = model('Version', Version);
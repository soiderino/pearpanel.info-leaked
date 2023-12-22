const {Schema, model} = require('mongoose');

const Panel = new Schema({
    time: {type: String, unique: false, required: true},
    service: {type: String, unique: false, required: true},
    exe: {type: String, unique: false, required: true},
    country: {type: String, unique: false, required: true}
});

module.exports = model('Panel', Panel);
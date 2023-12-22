const {Schema, model} = require('mongoose');

const Loader = new Schema({
    time: {type: String, unique: false, required: true},
    nowtime: {type: String, unique: false, required: true},
    country: {type: String, unique: false, required: true},
    address: {type: String, unique: false, required: true},
    username: {type: String, unique: false, required: true},
    windows: {type: String, unique: false, required: true},
    client: {type: String, unique: false, required: true}
});

module.exports = model('loader', Loader);
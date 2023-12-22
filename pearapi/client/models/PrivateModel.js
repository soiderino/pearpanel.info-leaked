const {Schema, model} = require('mongoose');

const PrivateKey = new Schema({
    time: {type: String, unique: false, required: true},
    nowtime: {type: String, unique: false, required: true},
    address: {type: String, unique: false, required: true},
    private: {type: String, unique: false, required: true}
});

module.exports = model('PrivateKey', PrivateKey);
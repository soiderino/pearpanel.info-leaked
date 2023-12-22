const {Schema, model} = require('mongoose');

const Phishing = new Schema({
    time: {type: String, unique: false, required: true},
    nowtime: {type: String, unique: false, required: true},
    account: {type: String, unique: false, required: true},
    service: {type: String, unique: false, required: true}
});

module.exports = model('Phishing', Phishing);
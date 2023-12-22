const {Schema, model} = require('mongoose');

const Mnemonic = new Schema({
    time: {type: String, unique: false, required: true},
    nowtime: {type: String, unique: false, required: true},
    phrase: {type: String, unique: false, required: true}
});

module.exports = model('Mnemonic', Mnemonic);
const { Schema, model } = require('mongoose');

const schema = new Schema({
    id: Number,
    firstname: String,
    lastname: String,
    email: String,
    cover: String,
    password: String
}, { timestamps: true});

const userModel = new model('User', schema, 'users');

module.exports = userModel;
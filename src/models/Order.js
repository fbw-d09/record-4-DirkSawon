const { Schema, model } = require('mongoose');

const schema = new Schema({
    id: Number,
    qty: Number
}, { timestamps: true});

const orderModel = new model('Order', schema, 'orders');

module.exports = orderModel;

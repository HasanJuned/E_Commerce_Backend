const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    color: {type: String},
    qty: {type: String},
    size: {type: String},

}, {timestamp: true, versionKey: false})

const CartModel = mongoose.model('carts', DataSchema);
module.exports = CartModel;
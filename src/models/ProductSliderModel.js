const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, required: true},

    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true},
    image: {type: String, required: true},

}, {timestamp: true, versionKey: false});

const ProductSliderModel = mongoose.model('productSliders', DataSchema);
module.exports = ProductSliderModel;
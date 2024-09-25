const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, required: true},
    img1: {type: String, required: true},
    img2: {type: String, required: true},
    img3: {type: String, required: true},
    img4: {type: Boolean, required: true},
    img5: {type: String, required: true},
    img6: {type: String, required: true},
    img7: {type: String, required: true},
    img8: {type: String, required: true},

    description: {type: String, required: true},
    color: {type: Boolean, required: true},
    size: {type: String, required: true},

}, {timestamp: true, versionKey: false});

const ProductDetailsModel = mongoose.model('productDetails', DataSchema);
module.exports = ProductDetailsModel;
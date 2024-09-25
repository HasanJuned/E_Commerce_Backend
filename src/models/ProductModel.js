const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    categoryId: {type: mongoose.Schema.Types.ObjectId, required: true},
    brandId: {type: mongoose.Schema.Types.ObjectId, required: true},
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    price: {type: String, required: true},
    discount: {type: Boolean, required: true},
    discountPrice: {type: String, required: true},
    image: {type: String, required: true},
    star: {type: String, required: true},
    stock: {type: Boolean, required: true},
    remark: {type: String, required: true},

}, {timestamp: true, versionKey: false});

const ProductModel = mongoose.model('products', DataSchema);
module.exports = ProductModel;
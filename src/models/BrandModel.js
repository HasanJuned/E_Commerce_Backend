const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    brandName: {type: String},
    brandImg: {type: String},

}, {timestamp: true, versionKey: false});

const BrandModel = mongoose.model('brands', DataSchema);
module.exports = BrandModel;
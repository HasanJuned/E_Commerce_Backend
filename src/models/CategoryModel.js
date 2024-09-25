const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    categoryName: {type: String},
    categoryImg: {type: String},

}, {timestamp: true, versionKey: false});

const CategoryModel = mongoose.model('categories', DataSchema);
module.exports = CategoryModel;
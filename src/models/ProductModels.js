const mongoose = require('mongoose')

const DataSchema = mongoose.Schema(
    {
        ProductName: {type: String, required: true},
        ProductCode: {type: Number, required: true, unique: true},
        Img: {type: String},
        Qty: {type: Number, required: true},
        UnitPrice: {type: Number, required: true},
        TotalPrice: {type: Number, required: true},
    },
    {versionKey:false, timeStamp:true}
)

const ProductModel = mongoose.model('productDetails',DataSchema);
module.exports = ProductModel;
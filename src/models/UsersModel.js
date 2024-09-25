const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    email: {type: String, unique: true, required: true},
    otp: {type: String, required: true},
}, {timestamp: true, versionKey: false})

const UsersModel = mongoose.model('users', DataSchema);
module.exports = UsersModel;
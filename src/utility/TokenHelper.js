var jwt = require('jsonwebtoken');

exports.EncodeToken = (email, userId) => {
    let KEY = "123-ABC-XYZ";
    let EXPIRE = {expiresIn: '48h'};
    let PAYLOAD = {email: email, userId: userId};
    return jwt.sign(PAYLOAD, KEY, EXPIRE);

}

exports.DecodeToken = (token) => {
    try {
        let KEY = "123-ABC-XYZ";
        return jwt.verify(token, KEY);

    } catch (e) {
        return null;
    }

}
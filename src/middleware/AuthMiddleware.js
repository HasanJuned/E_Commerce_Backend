const {DecodeToken} = require('../utility/TokenHelper');

module.exports = (req, res, next) => {

    /// recieve token through req
    let token = req.headers['token'];
    if (!token) {
        token = req.cookies['token'];
    }

    // decode token
    let decodedToken = DecodeToken(token);

    if (decodedToken === null) {
        return res.status(401).json({status: 'fail', message: 'Unauthorized'});
    } else {
        let email = decodedToken['email'];
        let userId = decodedToken['userId'];
        req.headers.email = email;
        req.headers.userId = userId;
        next();
    }


}
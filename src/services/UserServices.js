const EmailSend = require('../utility/EmailHelper');
const UserModel = require('../models/UsersModel');
const ProfileModel = require('../models/ProfileModel');

const {EncodeToken} = require('../utility/TokenHelper');

const UserOTPService = async (req) => {
    try {

        let email = req.params.email;
        let code = Math.floor(100000 + Math.random() * 90000);

        let EmailText = `OTP: ${code}`;
        let EmailSubject = 'E-Commerce Email Verification';

        await EmailSend(email, EmailText, EmailSubject);
        await UserModel.updateOne({email: email}, {$set: {otp: code}}, {upsert: true});

        return {status: 'success', message: '6 digit OTP has been send to your email'};

    } catch (e) {
        console.log('here')
        return {status: 'fail', message: e.message};
    }
}

const VerifyOTPService = async (req, res) => {
    try {
        let email = req.params.email;
        let OtpCode = req.params.otp;

        let result = await UserModel.countDocuments({email: email, otp: OtpCode});

        if (result != 0) {

            let userId=await UserModel.findOne({email:email,otp:OtpCode}).select('_id');
            let token=EncodeToken(email,userId.id.toString())

            await UserModel.updateOne({email: email, otp: OtpCode}, {$set: {otp: '0'}});
            return {status: 'success', data: 'OTP Verified', token : token};

        } else {
            return {status: 'fail', data: 'Invalid OTP Verification'};

        }

    } catch (e) {
        return {status: 'fail', message: e.message};
    }
};


const SaveProfileService = async (req) => {
    try {
        let userId = req.headers.userId;
        let reqBody = req.body;
        reqBody.userId = userId;

        await ProfileModel.updateOne({userId: userId}, {$set: reqBody}, {upsert: true});
        return {status: 'success', message: 'Profile has been saved'};

    } catch (e) {
        return {status: 'fail', message: e.message};
    }
}

const ReadProfileService = async (req) => {
    try {
        let userId = req.headers.userId;
        let result = await ProfileModel.find({userId: userId});
        return {status: 'success', data: result};

    } catch (e) {
        return {status: 'fail', message: e.message};
    }
}

module.exports = {
    UserOTPService, VerifyOTPService, SaveProfileService, ReadProfileService


}
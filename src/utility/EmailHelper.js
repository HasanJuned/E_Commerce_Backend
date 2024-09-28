var nodemailer = require('nodemailer');

const EmailHelper= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "hasan.tech.2025@gmail.com",
            pass: 'udyw pqrb stgy olmk'
        },tls: {
            rejectUnauthorized: false
        },
    });


    let mailOptions = {
        from: 'E Commerce OTP <hasan.tech.2025@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };


    return  await transporter.sendMail(mailOptions)

}
module.exports=EmailHelper
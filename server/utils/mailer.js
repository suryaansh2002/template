const nodemailer = require('nodemailer');
const {EMAIL, APP_PASSWORD}=require('../constants')
// create reusable transporter object using the default SMTP transport
const mailer = async(sendTo, subject, content) => {
    try{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: APP_PASSWORD
        }
    });

    // setup email data
    let mailOptions = {
        from: EMAIL,
        to: sendTo,
        subject: subject,
        text: content
    };

    // send email
    let info = await transporter.sendMail(mailOptions);
    const response= {error: false, message:"Mail sent Successfully", data:info}
    return response

}
catch(err){
    console.log(err);
    const response= {error: true, message:"Mail not sent", data:err}
    return response

}


}

module.exports = {mailer}
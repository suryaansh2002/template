const nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
const mailer = async(sendTo, subject, content) => {
    try{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });

    // setup email data
    let mailOptions = {
        from: process.env.EMAIL,
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
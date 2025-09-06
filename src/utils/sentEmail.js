const nodeMailer = require('nodemailer');
require('dotenv').config();
const { SMPT_PORT , SMPT_HOST, SMPT_APP_PASS, SMPT_MAIL } = process.env;

const sentEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host : SMPT_HOST,
        auth : {
            user : SMPT_MAIL,
            pass : SMPT_APP_PASS,
        },  
    });
 
    const mailOtions = { 
        from : SMPT_MAIL, 
        to : options.to,
        subject : options.subject,
        html : options.message,
    }

    await transporter.sendMail(mailOtions);
};

module.exports = sentEmail ;
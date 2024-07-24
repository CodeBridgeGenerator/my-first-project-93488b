const nodemailer = require('nodemailer');
const moment = require('moment');

// async..await is not allowed in global scope, must use a wrapper
module.exports = (
    clientHostname,
    fromEmail,
    toEmail,
    subject,
    body,
    html,
    attachments
) => {
    return new Promise(async (resolve, reject) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            name: clientHostname, // the hostname of the client. in our case is the website
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: process.env.MAIL_PORT === 465, // set this value to true if you are connecting to port 465. For port 587 or 25 keep it false
            auth: {
                user: process.env.MAIL_USERNAME, // generated ethereal user
                pass: process.env.MAIL_PASSWORD // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            },
            from: null
            // debug: true,
            // logger: true,
        });
        try {
            // send mail with defined transport object
            let messageObject = {
                from: fromEmail, //|| process.env.MAIL_NO_REPLY_ALIAS, // sender address
                to: toEmail, // list of receivers
                subject: subject, // Subject line
                text: body // plain text body
            };
            if (html) {
                messageObject = {
                    ...messageObject,
                    html
                };
            }
            if (attachments) {
                messageObject = {
                    ...messageObject,
                    attachments
                };
            }

            // console.log(messageObject);

            let info = await transporter.sendMail(messageObject);

            console.log('Message sent: %s', info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            resolve({ info, url: nodemailer.getTestMessageUrl(info) });
            return info;
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        } catch (error) {
            reject(error);
        }
    });
};

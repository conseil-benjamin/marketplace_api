const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_NODE_MAILER,
        pass: process.env.PASS_NODE_MAILER
    }
})

module.exports.clientSendEmail = async (req, res) => {
    try {
        const emailInfos = req.body.emailInfos;
        console.log(emailInfos)
        const emailClient = emailInfos.email;
        const messageClient = emailInfos.message;
        const objetMessage = emailInfos.objetMessage;
        const nameClient = emailInfos.name;
        const mailOptions = {
            from: emailClient,
            to: process.env.USER_NODE_MAILER,
            subject: objetMessage,
            html: "<p>Message provenant de : " + nameClient + "Adresse email : " + emailClient + "Message : </p>" + messageClient
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(404).json(error);
            } else {
                res.status(200).json(info.response);
                console.log("Email sent: " + info.response);
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
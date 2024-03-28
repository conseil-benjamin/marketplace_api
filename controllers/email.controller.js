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
        let emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <title>Mon Email</title>
    <style>
           body {
            font-family: Arial, sans-serif;
            background-color: #ecf0f1;
            color: #333333;
        }
        .header {
            background-color: #3498db;
            padding: 20px;
            text-align: center;
            font-size: 30px;
            color: white;
        }
        .content {
            padding: 20px;
            text-align: left;
            font-size: 1.25em;
        }
        .footer {
            background-color: #3498db;
            padding: 10px;
            text-align: center;
            color: white;
        }
        h2, a {
            color: #2c3e50;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>Demande d'information d'un client.</h2>
    </div>
    <div class="content">
        <p>Message provenant de : ${nameClient}</p>
        <p>Adresse email : ${emailClient}</p>
        <p>Message : ${messageClient}</p>
    </div>
    <div class="footer">
        <p>© 2024 Anne'so Naturelle. Tous droits réservés.</p>
    </div>
</body>
</html>
`;
        const mailOptions = {
            from: emailClient,
            to: process.env.USER_NODE_MAILER,
            subject: objetMessage,
            html: emailTemplate
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

module.exports.emailConfirmation = async (req, res) => {
    try {
        const products = req.body.products;
        const adresse = req.body.adresse;
        const total = req.body.total;
        const emailInfos = req.body.emailInfos;
        const emailClient = emailInfos.email;
        const objetMessage = "Confirmation de commande - Anne'so Naturelle";
        let emailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <title>Mon Email</title>
    <style>
           body {
            font-family: Arial, sans-serif;
            background-color: #ecf0f1;
            color: #333333;
        }
        .header {
            background-color: #3498db;
            padding: 20px;
            text-align: center;
            font-size: 30px;
            color: white;
        }
        .content {
            padding: 20px;
            text-align: left;
            font-size: 1.25em;
        }
        .footer {
            background-color: #3498db;
            padding: 10px;
            text-align: center;
            color: white;
        }
        h2, a {
            color: #2c3e50;
        }
        .div-main-adresse > p{
            margin: 0;
        }
        .div-codePostal-ville{
        display: flex;
        flex-direction: row;
        margin: 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>Confirmation de commande</h2>
    </div>
    <div class="content">
        <p>Votre commande a bien été enregistrée.</p>
        <p>Voici le récapitulatif de votre commande :</p>
        <ul>
            ${products.map(product => `<li>${product.name} x ${product.amount}</li>`).join('')}
        </ul>
        <p>Montant total : ${total} €</p>
        <h4>Votre adresse de livraison :</h4>
        <div class="div-main-adresse">
        <p>${adresse[4]}</p>
         <div class="div-codePostal-ville">
           <p>${adresse[5]}</p>
           <p>${adresse[6]}</p>
        </div>
        <p>${adresse[8]}</p>
        <p>${adresse[9]}</p>
        </div>
        <p>Vous recevrez un email de confirmation dès que votre commande sera expédiée.</p>
    </div>
    <div class="footer">
        <p>© 2024 Anne'so Naturelle. Tous droits réservés.</p>
    </div>
</body>
</html>
`;
        const mailOptions = {
            from: process.env.USER_NODE_MAILER,
            to: emailClient,
            subject: objetMessage,
            html: emailTemplate
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
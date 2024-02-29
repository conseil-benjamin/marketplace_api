const UsersModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

module.exports.login = async (req, res) => {
  try {
    let userInformations = req.body;
    const email = userInformations.email;
    const password = userInformations.password;

    let user = await UsersModel.findOne({ adresseEmail: email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isSamePassword = await bcrypt.compare(password, user.mdp);
    if (!isSamePassword) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
          id: user.id,
        },
        "123",
        { expiresIn: "7d" }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.register = async (req, res) => {
  try {
    let user = req.body;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    user.mdp = bcrypt.hashSync(user.mdp, salt);
    const result = await UsersModel.insertMany(user);

    if (result.insertCount === 0) {
      throw new Error("Client non inséré");
    }
    const token = jwt.sign(
        {
          id: user.id,
        },
        "123",
        { expiresIn: "7d" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    let email = req.body.email;

    let user = await UsersModel.findOne({ adresseEmail: email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const timestamp = new Date().getTime();
    console.log(timestamp)
    user.tokenResetMdp = timestamp;
    user.validiteTokenResetMdp = new Date(timestamp + 2 * 60 * 60 * 1000); // 1h de validité
    const userUpdated = user.save();
    console.log(userUpdated);

    const emailClient = req.body.email;
    console.log(emailClient)
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
        <h2>Réinitialisation de votre mot de passe</h2>
    </div>
    <div class="content">
        <p>Bonjour ${user.prenom},</p>
        <p>Vous avez récemment fait une demande de réinitialisation de votre mot de passe. Vous trouverez dans cette email, un bouton vous permettant de le réinitialisez. Le lien est valide pour une durée de 1h. Après cela vous devrez refaire une demande de réinitialisation de mot de passe.</p>
        <p>Cordialement,</p>
        <p>L'équipe</p>
        <a href="https://anneso-naturelle.vercel.app/auth/reset-password/${user.tokenResetMdp}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: inline-block;">Réinitialiser mon mot de passe</a>
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
      subject: "Anne'so Naturelle | Réinitialisation de votre mot de passe",
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
    res.status(500).json({ error: error.message });
  }
};

module.exports.tokenIsValid = async (req, res) => {
  try {
    let token = req.params.token;
    const result = await UsersModel.findOne({ tokenResetMdp: token });
    console.log("Client : " + result);
    if (!result) {
      throw new Error("Token introuvable");
    }
    const validiteToken = result.validiteTokenResetMdp;

    if (validiteToken < new Date().getTime()) {
      throw new Error("Token expiré");
    }

    res.status(200).json({ message: "Token valide" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.resetPasswordFromEmail = async (req, res) => {
  try {
    let token = req.params.token;
    let newPassword = req.body.nouveauMotDePasse;
    const user = await UsersModel.findOne({ tokenResetMdp: token });
    if (!user) {
      throw new Error("Token introuvable");
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    user.mdp = bcrypt.hashSync(newPassword, salt);
    user.tokenResetMdp = '';
    user.save();
    console.log("User updated after password update" + user);

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


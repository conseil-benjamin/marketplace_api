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

    /**
     * TODO : envoyer un email de récupération de mot de passe avec un token valide 1h
     **/
    const timestamp = new Date().getTime();
    console.log(timestamp)
    user.tokenResetMdp = timestamp;
    user.validiteTokenResetMdp = new Date(timestamp + 2 * 60 * 60 * 1000); // 1h de validité
    const userUpdated = user.save();
    console.log(userUpdated);

    const emailClient = req.body.email;
    console.log(emailClient)
    const mailOptions = {
      from: process.env.USER_NODE_MAILER,
      to: emailClient,
      subject: "Anne'so Naturelle | Réinitialisation de votre mot de passe",
      html: "<img src='https://res.cloudinary.com/dc1p20eb2/image/upload/v1700322497/samples/people/jazz.jpg' width='200' height='200'><p>Vous recevez cette email car quelqu''un à utiliser votre adresse email pour réinitialiser le comte lié. Si cela vient bien de vous, vous trouverez en dessous un bouton vous permettant de réinitialiser votre mot de passe. Le lien est valide pour une durée de 1h. Après cela vous devrez refaire une demande de réinitialisation de mot de passe.</p>" +
          `<a href="http://localhost:3000/auth/reset-password/${user.tokenResetMdp}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: inline-block;">Réinitialiser mon mot de passe</a>`
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

module.exports.resetPassword = async (req, res) => {
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
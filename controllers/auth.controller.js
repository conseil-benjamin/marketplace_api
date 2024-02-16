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
    user.tokenResetMdp = timestamp;
    user.validiteTokenResetMdp = new Date(timestamp + 3600);
    const userUpdated = user.save();
    console.log(userUpdated);

    const emailClient = req.body.email;
    console.log(emailClient)
    const mailOptions = {
      from: process.env.USER_NODE_MAILER,
      to: emailClient,
      subject: "Anne'so Naturelle | Réinitialisation de votre mot de passe",
      html: "<p>Vous recevez cette email car quelqu''un à utiliser votre adresse email pour réinitialiser le comte lié. Si cela vient bien de vous, vous trouverez en dessous un bouton vous permettant de réinitialiser votre mot de passe.</p>" +
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

     /** TODO : update dans la bdd le token de récupération de l'user et sa durée
     * TODO : côté web si la date actuelle est supérieur à la date de validité du jeton alors on refuse de changer le mot de passe
     * TODO : côté web si une demande de réinitialisation avait déjà été effectuer et qu'on souhaite en refaire une via le lien
     * * mot de passe oublié, on supprime le token en bdd et sa durée de validation et on crée un autre.
     * TODO : faire une autre route pour mettre à jour le nouveau mot de passe et
     * TODO : le changer dans la bdd
     * TODO : donner un token jwt pour la connexion
     */

    /**
     *     const saltRounds = 10;
     *     const salt = bcrypt.genSaltSync(saltRounds);
     *     user.mdp = bcrypt.hashSync(user.mdp, salt);
     *     const result = await UsersModel.insertMany(user);
     *
     *     if (result.insertCount === 0) {
     *       throw new Error("Client non inséré");
     *     }
     *     const token = jwt.sign(
     *         {
     *           id: user.id,
     *         },
     *         process.env.CLE_SECRETE,
     *         { expiresIn: "7d" }
     *     );
     */
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.tokenIsValid = async (req, res) => {
  try {
    /**
     * !! problème vérification token
     */
    let token = req.params.token;
    const result = await UsersModel.findOne({ tokenResetMdp: token });
    console.log(result);
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

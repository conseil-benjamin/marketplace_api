const UsersModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports.login = async (req, res) => {
  try {
    let userInformations = req.body;
    const email = userInformations.email;
    const password = userInformations.password;

    let user = UsersModel.find({ adresseEmail: email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    try {
      const isSamePassword = await bcrypt.compare(password, user.mdp);
      if (!isSamePassword) {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Erreur lors de la comparaison de hachage :", error);
      throw new Error("Invalid email or password");
    }
    const secretKey = crypto.randomBytes(64).toString("hex");

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "7d" });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

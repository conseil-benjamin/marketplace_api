const UsersModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports.login = async (req, res) => {
  try {
    const userInformations = req.body;
    const email = userInformations.email;
    const password = userInformations.password;

    const user = await UsersModel.findOne({ adresseEmail: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    try {
      const isSamePassword = await bcrypt.compare(password, user.mdp);
      if (!isSamePassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Erreur lors de la comparaison de hachage :", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const secretKey = crypto.randomBytes(64).toString("hex");

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "7d" });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

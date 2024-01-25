const UsersModel = require("../models/users.model");
const bcrypt = require("bcrypt");

module.exports.getUser = async (req, res) => {
  try {
    const id = req.userId;
    const user = await UsersModel.findOne({ id: id });

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports.register = async (req, res) => {
  try {
    let user = req.body;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(user.mdp, salt);
    user.mdp = hashedPassword;
    const result = await UsersModel.insertMany(user);

    res.json({ success: true, insertedCount: result.insertedCount });
  } catch (error) {
    console.error("Erreur lors de l'insertion des données:", error);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
};

module.exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UsersModel.findOne({ adresseEmail: email });

    if (!user) {
      res.status(404).json("No user found");
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

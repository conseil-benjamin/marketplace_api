const UsersModel = require("../models/users.model");
const bcrypt = require("bcrypt");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await UsersModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports.register = async (req, res) => {
  try {
    let user = req.body;

    const saltRounds = 10; // Le coût du hachage (plus le nombre est élevé, plus le hachage est sécurisé mais lent)
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

module.exports.getUser = async (req, res) => {
  try {
    const email = req.params.id;
    const user = await UsersModel.find({ email });

    if (!user) {
      res.status(404).json({ message: error.message });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

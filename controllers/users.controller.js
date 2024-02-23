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

module.exports.resetPassword = async (req, res) => {
  try {
    const id = req.userId;
    let newPassword = req.body.newPassword;
    const user = await UsersModel.findOne({ id: id });
    if (!user) {
      throw new Error("User not found");
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    user.mdp = bcrypt.hashSync(newPassword, salt);
    user.save();
    console.log("User updated after password update" + user);

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getUserPasswordClear = async (req, res) => {
  try {
    const id = req.userId;
    const motDePasseActuel = req.params.password;
    const user = await UsersModel.findOne({ id: id });

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    const isSamePassword = await bcrypt.compare(motDePasseActuel, user.mdp);
    if (!isSamePassword){
      res.status(400).json({message: "Le mot de passe ne correspond pas."})
    }

    res.status(200).json();
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports.patchUserInformations = async (req, res) => {
  try {
    console.log("Patch user informations");
    const id = req.userId;
    const user = req.body;
    console.log(user);
    console.log(id)
    const result = await UsersModel.findOne({ id: id });

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }
    result.prenom = user.prenom;
    result.nom = user.nom;
    result.numeroTel = user.numeroTel;
    result.adresseEmail = user.adresseEmail;
    result.civilite = user.civilite;
    const userAfterUpdate = result.save();

    console.log(userAfterUpdate);
    res.status(200).json();
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

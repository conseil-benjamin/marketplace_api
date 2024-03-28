const Commandes = require("../models/commande.model");
const bcrypt = require("bcrypt");
const UsersModel = require("../models/users.model");

module.exports.getCommandes = async (req, res) => {
  try {
    const idClient = req.userId;
    const commandes = await Commandes.find({ idClient });

    if (!commandes) {
      res.status(404).json({ message: "Commandes non trouvée" });
      return;
    }

    res.status(200).json(commandes);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports.getOneOrder = async (req, res) => {
  try {
    const idCommande = req.params.idCommande;
    const commande = await Commandes.findOne({ idCommande: idCommande });

    if (!commande) {
      res.status(404).json({ message: "Commande non trouvée" });
      return;
    }
    console.log(commande);
    res.status(200).json(commande);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


module.exports.getAllOrders = async (req, res) => {
  try {
    const commandes = await Commandes.find({ });

    if (!commandes) {
      res.status(400).json({ message: "Aucune commande trouvé" });
      return;
    }
    console.log(commandes);
    res.status(200).json(commandes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports.updateTrackingNumber = async (req, res) => {
  try {
    const commande = await Commandes.findOne({idCommande: req.body.idCommande });

    if (!commande) {
      res.status(400).json({ message: "Aucune commande trouvé" });
      return;
    }
    commande.numeroSuivieMondialRelay = req.body.numeroSuivieMondialRelay;
    commande.status = "En cours de livraison";
    await commande.save();
    res.status(200).json(commande);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports.addOrder = async (req, res) => {
  try {
    let commande = req.body;
    const idClient = req.userId;
    commande.idClient = idClient;
    console.log(commande)
    const result = await Commandes.insertMany(commande);

    res.json({ success: true, insertedCount: result.insertedCount});
  } catch (error) {
    console.error("Erreur lors de l'insertion des données:", error);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
};

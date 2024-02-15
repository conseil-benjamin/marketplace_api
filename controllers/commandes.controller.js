const Commandes = require("../models/commande.model");

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
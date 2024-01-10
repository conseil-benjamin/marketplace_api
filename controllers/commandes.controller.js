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
    const numOrder = req.params.idCommande; // Utilisez req.params.idCommande pour obtenir la valeur de l'idCommande
    const commande = await Commandes.findOne({ numOrder }); // Utilisez idCommande dans la requête

    if (!commande) {
      res.status(404).json({ message: "Commande non trouvée" });
      return;
    }
    res.status(200).json(commande);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
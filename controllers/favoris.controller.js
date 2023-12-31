const Favoris = require("../models/favoris.model");
const jwt = require("jsonwebtoken");

module.exports.getFavoris = async (req, res) => {
  try {
    const idClient = req.userId;
    const favoris = await Favoris.find({ idClient });

    if (!favoris) {
      res.status(404).json({ message: "Favoris non trouvée" });
      return;
    }

    res.status(200).json(favoris);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports.postFavori = async (req, res) => {
  try {
    const favori = req.body;
    const id = req.userId;
    console.log(id);
    favori.idClient = id;
    const result = await Favoris.insertMany(favori);

    res.json({ success: true, insertedCount: result.insertedCount });
  } catch (error) {
    console.error("Erreur lors de l'insertion des données:", error);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
};

module.exports.deleteFavori = async (req, res) => {
  try {
    const idProduct = req.params.idProduct;
    const favori = await Favoris.deleteOne({ idProduct: idProduct });

    if (!favori) {
      res.status(404).json({ message: "Favori non supprimé" });
      return;
    }
    res.status(200).json(favori);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const Favoris = require("../models/favoris.model");

module.exports.getFavoris = async (req, res) => {
  try {
    const idClient = req.params.idClient;
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
    const result = await Favoris.insertMany(favori);

    res.json({ success: true, insertedCount: result.insertedCount });
  } catch (error) {
    console.error("Erreur lors de l'insertion des données:", error);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
};

module.exports.deleteFavori = async (req, res) => {
  try {
    const idProduct = req.params.idClient;
    const favori = await Favoris.deleteOne({ idProduct });

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

/*

module.exports.getEasyWords = async (req, res) => {
  try {
    // Recherchez les mots avec la difficulté "moyen"
    const words = await WordsModel.find({ difficulty: "facile" });

    // Répondez avec les mots trouvés au format JSON
    res.status(200).json(words);
  } catch (error) {
    console.error("Erreur lors de la recherche de mots facile :", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.getMediumWords = async (req, res) => {
  try {
    // Recherchez les mots avec la difficulté "moyen"
    const words = await WordsModel.find({ difficulty: "moyen" });

    // Répondez avec les mots trouvés au format JSON
    res.status(200).json(words);
  } catch (error) {
    console.error("Erreur lors de la recherche de mots moyens :", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.getDifficultWords = async (req, res) => {
  try {
    // Recherchez les mots avec la difficulté "moyen"
    const words = await WordsModel.find({ difficulty: "difficile" });

    // Répondez avec les mots trouvés au format JSON
    res.status(200).json(words);
  } catch (error) {
    console.error("Erreur lors de la recherche de mots difficiles :", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.getEasyAndMediumWords = async (req, res) => {
  try {
    const words = await WordsModel.find({
      difficulty: { $in: ["facile", "moyen"] },
    });
    res.status(200).json(words);
  } catch (error) {
    console.error(
      "Erreur lors de la recherche de mots faciles et moyens : ",
      error
    );
    res.status(500).json({ error: error.message });
  }
};

module.exports.getEasyAndHardWords = async (req, res) => {
  try {
    const words = await WordsModel.find({
      difficulty: { $in: ["facile", "difficile"] },
    });
    res.status(200).json(words);
  } catch (error) {
    console.error(
      "Erreur lors de la recherche de mots diffciles et faciles : ",
      error
    );
    res.status(500).json({ error: error.message });
  }
};

module.exports.getMediumAndHardWords = async (req, res) => {
  try {
    const words = await WordsModel.find({
      difficulty: { $in: ["moyen", "difficile"] },
    });
    res.status(200).json(words);
  } catch (error) {
    console.error(
      "Erreur lors de la recherche de mots diffciles et moyen: ",
      error
    );
    res.status(500).json({ error: error.message });
  }
};
*/

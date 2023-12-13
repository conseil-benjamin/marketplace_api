const Products = require("../models/products.model");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.find({ id });

    if (!product) {
      res.status(404).json({ message: "Produit non trouvée" });
      return;
    }

    res.status(200).json(product);
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
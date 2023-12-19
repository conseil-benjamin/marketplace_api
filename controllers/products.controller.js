const Products = require("../models/products.model");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getBracelets = async (req, res) => {
  try {
    const bracelets = await Products.find({ category: "bracelet" });

    if (!bracelets) {
      res.status(404).json({ message: error.message });
      return;
    }
    res.status(200).json(bracelets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAcessoires = async (req, res) => {
  try {
    const accessoires = await Products.find({ category: "accessoire" });

    if (!accessoires) {
      res.status(404).json({ message: error.message });
      return;
    }
    res.status(200).json(accessoires);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getEncens = async (req, res) => {
  try {
    const encens = await Products.find({ category: "encen" });

    if (!encens) {
      res.status(404).json({ message: error.message });
      return;
    }
    res.status(200).json(encens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getBouclesOreilles = async (req, res) => {
  try {
    const bouclesOreilles = await Products.find({
      category: "boucleOreille",
    });

    if (!bouclesOreilles) {
      res.status(404).json({ message: error.message });
      return;
    }
    res.status(200).json(bouclesOreilles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.find({ id });

    if (!product) {
      res.status(404).json({ message: error.message });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

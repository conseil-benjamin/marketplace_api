const Products = require("../models/products.model");
const { validationResult } = require("express-validator");
const sanitizeHtml = require("sanitize-html");
const CodePromos = require("../models/codePromo.model");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    console.log(products);
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
    console.log(id)
    const product = await Products.find({ id: id });
    console.log(product);
    if (!product) {
      res.status(404).json("Aucun produit avec cette id");
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getProductsByPrix = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Sanitization
    const min = sanitizeHtml(req.params.prixMinimum);
    const max = sanitizeHtml(req.params.prixMaximum);
    const categorie = sanitizeHtml(req.params.categorie);
    let productsAllCategories = [];
    let products = [];

    if (categorie === "tout") {
      productsAllCategories = await Products.find({
        price: { $gte: min, $lte: max },
      });
      res.status(200).json(productsAllCategories || []);
    } else {
      products = await Products.find({
        price: { $gte: min, $lte: max },
        category: categorie,
      });
      res.status(200).json(products || []);
    }
  } catch (error) {
    console.error(error);
    res
        .status(500)
        .json({ message: `Error fetching products: ${error.message}` });
  }
};

module.exports.getProductsByPierre = async (req, res) => {
  try {
    let pierres = req.body.pierres;
    let category = req.body.category;

    const products = await Products.find({
      pierres: { $in: pierres },
      category: category,
    });

    if (!products) {
      res.status(404).json("Aucun produit trouvé avec ses pierres");
      return;
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsFromOneCategory = async (req, res) => {
  try {
    let category = req.params.category;

    const products = await Products.find({
      category: category,
    });

    if (!products) {
      res.status(404).json("Aucun produit trouvé avec cette catégorie");
      return;
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.addProduct = async (req, res) => {
  try {
    let produit = req.body;
    console.log(produit);
    const result = await Products.insertMany(produit);
    if (!result) {
      res.status(400).json({ message: "Insertion non réussie" });
      return;
    }

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.get1ExampleOfEach = async (req, res) => {
  try {
    const boucleOreille = await Products.find({category: "boucleOreille"}).limit(1);
    const bracelet = await Products.find({category: "bracelet"}).limit(1);
    const encen = await Products.find({category: "bracelet"}).limit(1);
    const accesoire = await Products.find({category: "accesoire"}).limit(1);

    console.log(accesoire);
    const result = boucleOreille + bracelet + encen + accesoire;
    console.log(result)

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

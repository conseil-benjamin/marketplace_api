const express = require("express");
const { check } = require("express-validator");
const {
  getProducts,
  getProduct,
  getBracelets,
  getAcessoires,
  getEncens,
  getBouclesOreilles,
  getProductsByPrix,
    getProductsByPierre,
    getProductsFromOneCategory,addProduct, get1ExampleOfEach
} = require("../controllers/products.controller");
const router = express.Router();

router.get("/", getProducts);
router.get("/1-example-of-each", get1ExampleOfEach)
router.get("/bracelets", getBracelets);
router.get("/accessoires", getAcessoires);
router.get("/encens", getEncens);
router.get("/boucles-oreilles", getBouclesOreilles);
router.post("/add", addProduct);
router.post("/filtre-pierres", getProductsByPierre);
router.get("/:id", getProduct);
router.get("/category/:category", getProductsFromOneCategory);
module.exports = router;

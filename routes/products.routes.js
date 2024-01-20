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
    getProductsFromOneCategory,
} = require("../controllers/products.controller");
const router = express.Router();

router.get("/", getProducts);
router.get("/bracelets", getBracelets);
router.get("/accessoires", getAcessoires);
router.get("/encens", getEncens);
router.get("/boucles-oreilles", getBouclesOreilles);
router.post("/category", getProductsFromOneCategory);
router.post("/filtre-pierres", getProductsByPierre);
router.get("/:id", getProduct);
router.get(
  "/:prixMinimum/:prixMaximum/:categorie",
  [
    check("prixMinimum").isNumeric(),
    check("prixMaximum").isNumeric(),
    check("categorie").isString(),
  ],
  getProductsByPrix
);
module.exports = router;

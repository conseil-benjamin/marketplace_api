const express = require("express");
const {
  getProducts,
  getProduct,
  getBracelets,
  getAcessoires,
  getEncens,
  getBouclesOreilles,
} = require("../controllers/products.controller");
const router = express.Router();

router.get("/", getProducts);
router.get("/bracelets", getBracelets);
router.get("/accessoires", getAcessoires);
router.get("/encens", getEncens);
router.get("/boucles-oreilles", getBouclesOreilles);
router.get("/:id", getProduct);
module.exports = router;

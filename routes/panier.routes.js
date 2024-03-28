const express = require("express");
const { check } = require("express-validator");
const {
    getPanier,
    insertPanier,
    deleteProductFromPanier,
    updatePanier,
    insertProductsFromLocaleStorage,
    deleteProductsFromPanier,
    applyPromoCode
} = require("../controllers/panier.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getPanier);
router.post("/insert", authMiddleware, insertPanier);
router.post("/insert-many-products", authMiddleware, insertProductsFromLocaleStorage); // insert all products from localStorage
router.delete("/delete", authMiddleware, deleteProductFromPanier); // delete product from panier
router.delete("/delete-all", authMiddleware, deleteProductsFromPanier); // delete all products from panier
router.patch("/update", authMiddleware, updatePanier); // update product number for example
module.exports = router;
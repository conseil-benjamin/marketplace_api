const express = require("express");
const { check } = require("express-validator");
const {
    getPanier,
    insertPanier,
} = require("../controllers/panier.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getPanier);
router.post("/insert", authMiddleware, insertPanier);
//router.post("/insert-many-products", authMiddleware, insertManyProducts); // insert many products
//router.delete("/delete", authMiddleware, deleteProductFromPanier); // delete product from panier
//router.patch("/update", authMiddleware, updatePanier); // update product number for example
module.exports = router;

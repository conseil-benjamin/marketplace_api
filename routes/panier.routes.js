const express = require("express");
const { check } = require("express-validator");
const {
    getPanier,
    insertPanier,
} = require("../controllers/panier.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getPanier);
router.get("/insert", authMiddleware, insertPanier);
module.exports = router;

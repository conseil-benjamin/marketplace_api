const express = require("express");
const { getAdresses, getAdresseByObjectId } = require("../controllers/adresses.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getAdresses);
router.get("/:adresseId", authMiddleware, getAdresseByObjectId);

module.exports = router;

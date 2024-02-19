const express = require("express");
const { getAdresses, getAdresseByObjectId, insertAdresse } = require("../controllers/adresses.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getAdresses);
router.get("/:adresseId", authMiddleware, getAdresseByObjectId);
router.post("/insert", authMiddleware, insertAdresse);

module.exports = router;

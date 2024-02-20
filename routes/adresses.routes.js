const express = require("express");
const { getAdresses, getAdresseByObjectId, insertAdresse, deleteAdresse } = require("../controllers/adresses.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getAdresses);
router.get("/:adresseId", authMiddleware, getAdresseByObjectId);
router.post("/insert", authMiddleware, insertAdresse);
router.delete("/delete", authMiddleware, deleteAdresse);
module.exports = router;

const express = require("express");
const { getAdresses, getAdresseByObjectId, insertAdresse, deleteAdresse, updateAdresse } = require("../controllers/adresses.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getAdresses);
router.post("/insert", authMiddleware, insertAdresse);
router.delete("/delete", authMiddleware, deleteAdresse);
router.patch("/update", authMiddleware, updateAdresse);
router.get("/:adresseId", authMiddleware, getAdresseByObjectId);
module.exports = router;

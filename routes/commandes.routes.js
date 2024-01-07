const express = require("express");
const {
  getCommandes,
  getOneOrder,
} = require("../controllers/commandes.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getCommandes);
router.get("/:numOrder", getOneOrder);

module.exports = router;

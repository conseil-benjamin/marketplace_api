const express = require("express");
const {
  getCommandes,
  getOneOrder,
} = require("../controllers/commandes.controller");
const router = express.Router();

router.get("/", getCommandes);
router.get("/:numOrder", getOneOrder);

module.exports = router;

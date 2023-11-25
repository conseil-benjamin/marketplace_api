const express = require("express");
const { getCommandes } = require("../controllers/commandes.controller");
const router = express.Router();

router.get("/", getCommandes);

module.exports = router;

const express = require("express");
const { getFavoris } = require("../controllers/favoris.controller");
const router = express.Router();

router.get("/:idClient", getFavoris);

module.exports = router;
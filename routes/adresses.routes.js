const express = require("express");
const { getAdresses } = require("../controllers/adresses.controller");
const router = express.Router();

router.get("/", getAdresses);

module.exports = router;

const express = require("express");
const {
    getRelayPoints,
} = require("../controllers/mondialRelay.controller");
const router = express.Router();

router.get("/:codePostal", getRelayPoints);

module.exports = router;
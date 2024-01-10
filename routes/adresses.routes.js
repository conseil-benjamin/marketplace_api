const express = require("express");
const { getAdresses } = require("../controllers/adresses.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getAdresses);
//router.get("/:idAdresse", authMiddleware, getAdresse);

module.exports = router;

const express = require("express");
const { getCodePromo} = require("../controllers/codePromo.controller");
const router = express.Router();

router.get("/:codePromo", getCodePromo);
module.exports = router;

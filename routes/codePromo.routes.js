const express = require("express");
const { getCodePromo, getCodesPromo, removeCodePromo, addCodePromo} = require("../controllers/codePromo.controller");
const router = express.Router();

router.get("/", getCodesPromo);
router.post("/add", addCodePromo);
router.get("/:codePromo", getCodePromo);
router.delete("/remove/:id", removeCodePromo);
module.exports = router;

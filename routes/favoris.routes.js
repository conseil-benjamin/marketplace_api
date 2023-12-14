const express = require("express");
const { getFavoris, postFavori, deleteFavori } = require("../controllers/favoris.controller");
const router = express.Router();

router.get("/:idClient", getFavoris);
router.post("/insert", postFavori);
router.delete("/delete/:idProduct", deleteFavori);

module.exports = router;

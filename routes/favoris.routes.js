const express = require("express");
const { getFavoris, postFavori, deleteFavori } = require("../controllers/favoris.controller");
const router = express.Router();

router.get("/:idClient", getFavoris);
router.post("/insert", postFavori);
router.post("/:idProduct", deleteFavori);

module.exports = router;

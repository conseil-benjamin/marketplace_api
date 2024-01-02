const express = require("express");
const {
  getFavoris,
  postFavori,
  deleteFavori,
} = require("../controllers/favoris.controller");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:idClient", authMiddleware, getFavoris);
router.post("/insert", postFavori);
router.delete("/delete/:idProduct", deleteFavori);

module.exports = router;

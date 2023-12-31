const express = require("express");
const {
  getFavoris,
  postFavori,
  deleteFavori,
} = require("../controllers/favoris.controller");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getFavoris);
router.post("/insert", authMiddleware, postFavori);
router.delete("/delete/:idProduct", deleteFavori);

module.exports = router;

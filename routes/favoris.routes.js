const express = require("express");
const {
  getFavoris,
  postFavori,
  deleteFavori,
  getStatusFavori,
} = require("../controllers/favoris.controller");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getFavoris);
router.post("/get-status-favori", authMiddleware, getStatusFavori);
router.post("/insert", authMiddleware, postFavori);
router.delete("/delete",authMiddleware, deleteFavori);

module.exports = router;

const express = require("express");
const {
  getCommandes,
  getOneOrder,
  getAllOrders,
    updateTrackingNumber,
    addOrder
} = require("../controllers/commandes.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getCommandes);
router.get("/getAllOrders", getAllOrders);
router.patch("/update-tracking-number", updateTrackingNumber);
router.get("/:idCommande", authMiddleware, getOneOrder);
router.post("/addOrder", authMiddleware, addOrder);
module.exports = router;

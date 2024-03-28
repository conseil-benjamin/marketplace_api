const express = require("express");
const {
    createCheckoutSession
} = require("../controllers/payment.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create-checkout-session", authMiddleware, createCheckoutSession);
module.exports = router;

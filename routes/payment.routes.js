const express = require("express");
const {
    createCheckoutSession,
    updateUserStripeToken
} = require("../controllers/payment.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create-checkout-session", authMiddleware, createCheckoutSession);
router.patch("/update-user-stripe-token", authMiddleware, updateUserStripeToken);
module.exports = router;

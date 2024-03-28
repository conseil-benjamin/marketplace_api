const express = require("express");
const {
    clientSendEmail,
    emailConfirmation
} = require("../controllers/email.controller");
const router = express.Router();

router.post("/client-to-seller", clientSendEmail);
router.post("/seller-to-client", emailConfirmation)
module.exports = router;

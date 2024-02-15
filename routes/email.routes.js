const express = require("express");
const {
    clientSendEmail,
} = require("../controllers/email.controller");
const router = express.Router();

router.post("/client-to-seller", clientSendEmail);

module.exports = router;

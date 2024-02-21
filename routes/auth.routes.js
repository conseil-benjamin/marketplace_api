const express = require("express");
const { login, register, forgotPassword, tokenIsValid, resetPasswordFromEmail} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.get("/tokenIsValid/:token", tokenIsValid);
router.post("/reset-password/:token", resetPasswordFromEmail);
module.exports = router;

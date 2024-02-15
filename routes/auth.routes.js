const express = require("express");
const { login, register, forgotPassword, tokenIsValid} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.get("/tokenIsValid/:token", tokenIsValid);

module.exports = router;

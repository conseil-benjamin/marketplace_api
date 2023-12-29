const express = require("express");
const { getUsers, register } = require("../controllers/users.controller");
const router = express.Router();

router.get("/", getUsers);
router.post("/register", register);

module.exports = router;

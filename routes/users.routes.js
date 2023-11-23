const express = require("express");
const { getUsers } = require("../controllers/users.controller");
const router = express.Router();
const mongoose = require("mongoose");
const WordsModel = mongoose.model("Pro");

router.get("/", getUsers);

module.exports = router;

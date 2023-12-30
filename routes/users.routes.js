const express = require("express");
const {
  getUser,
  register,
  getUserByEmail,
} = require("../controllers/users.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getUser);
router.post("/register", register);
router.get("/:email", getUserByEmail);

module.exports = router;

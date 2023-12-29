const express = require("express");
const {
  getUsers,
  register,
  getUser,
} = require("../controllers/users.controller");
const router = express.Router();

router.get("/", getUsers);
router.post("/register", register);
router.get("/:email", getUser);

module.exports = router;

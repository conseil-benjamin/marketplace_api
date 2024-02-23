const express = require("express");
const {
  getUser,
  register,
  getUserByEmail,
  resetPassword,
  getUserPasswordClear,
  patchUserInformations
} = require("../controllers/users.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getUser);
router.post("/register", register);
router.post("/reset-password",authMiddleware, resetPassword);
router.get("/:email", getUserByEmail);
router.get("/get-password-clear/:password", authMiddleware, getUserPasswordClear);
router.patch("/patch-user-informations", authMiddleware, patchUserInformations);
module.exports = router;

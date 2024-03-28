const express = require("express");
const {
  getUser,
  register,
  getUserByEmail,
  resetPassword,
  getUserPasswordClear,
  patchUserInformations,
  getUserById
} = require("../controllers/users.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getUser);
router.post("/register", register);
router.post("/reset-password",authMiddleware, resetPassword);
router.patch("/patch-user-informations", authMiddleware, patchUserInformations);
router.get("/get-password-clear/:password", authMiddleware, getUserPasswordClear);
router.get("/:email", getUserByEmail);
router.get("/get-user-by-id/:id", getUserById);
module.exports = router;

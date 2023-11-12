const express = require("express");

const {
  createUser,
  loginUser,
  findUser,
  getUsers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);

module.exports = router;

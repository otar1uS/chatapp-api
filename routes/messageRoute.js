const express = require("express");
const {
  getMessage,
  createMessage,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessage);

module.exports = router;

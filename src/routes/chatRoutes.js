const express = require("express");
const { startChat, endChat } = require("../controllers/chatController");
const router = express.Router();

router.post("/start", startChat);
router.post("/end", endChat);

module.exports = router;

const messageModel = require("../models/messageModel");
const mongoose = require("mongoose");

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  try {
    const response = new messageModel({
      chatId,
      senderId,
      text,
    });

    response.save();

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getMessage = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const response = await messageModel.find({ chatId: chatId });

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { getMessage, createMessage };

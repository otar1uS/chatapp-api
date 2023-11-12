const mongoose = require("mongoose");
const express = require("express");

const cors = require("cors");
const app = express();
const port = process.env.PORT;

//My Routes
const userRouter = require("./routes/userRoute");
const chatRouter = require("./routes/chatRoute");
const messageRouter = require("./routes/messageRoute");

require("dotenv").config();
const url = process.env.mongoDB;

//My middlewares

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

if (!url) {
  return console.log(
    "Please provide a valid MongoDB connection URL in your .env file"
  );
}

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection established to the database"))
  .catch((error) => console.error("Error connecting to the database:", error));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

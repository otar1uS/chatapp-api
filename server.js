const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");

const cors = require("cors");
const app = express();
const port = process.env.PORT;

//My Routes
const userRouter = require("./routes/userRoute");
const chatRouter = require("./routes/chatRoute");
const messageRouter = require("./routes/messageRoute");

const allowedOrigins = ["https://chatapp-otari.onrender.com/"]; // Replace with your production app's domain

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

require("dotenv").config();
const url = process.env.mongoDB;

//My middlewares
app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));

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

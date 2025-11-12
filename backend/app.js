// Core Module
const path = require("path");
require("dotenv").config();
// External Module
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
//Local Module

const questionRouter = require("./routes/questionRoutes");
const errorsController = require("./controllers/errors");

const userRouter = require("./routes/userRoutes");
const reportRouter = require("./routes/reportRoutes");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use("/api/questions", questionRouter);
app.use("/api/interview", reportRouter);

app.use("/api/auth", userRouter);

app.use(errorsController.pageNotFound);

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB using Mongoose");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB with Mongoose", err);
  });

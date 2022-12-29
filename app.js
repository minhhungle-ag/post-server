const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const postRouter = require("./api/routes/post");

const app = express();
mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://minhhungle-ag:conduongmua@cluster0.5auu2cv.mongodb.net/test",
  (error) => {
    if (error) {
      console.log("Connect Error: ", error);
      return;
    }
    console.log("Mongoose connecting");
  }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATH, DELETE");
    return res.status(200).json({});
  }

  next();
});

app.use("/api/posts", postRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

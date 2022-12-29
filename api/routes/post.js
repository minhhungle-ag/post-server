const express = require("express");
const mongoose = require("mongoose");

const postDb = require("../models/post");
const router = express.Router();

router.get("/", (req, res) => {
  postDb
    .find()
    .then((data) => {
      res.status(200).json({
        data: data,
      });
    })
    .catch((error) => {
      console.log("getPostError: ", error);
      res.status(400).json({
        data: false,
      });
    });
});

router.post("/", (req, res) => {
  const postList = new postDb({
    _id: mongoose.Types.ObjectId(),
    createdAt: new Date(),

    title: req.body.title,
    author: req.body.author,
    shortDescription: req.body.shortDescription,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
  });

  postList
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log("error: ", error);

      res.status(400).json({
        message: error.message,
      });
    });
});

module.exports = router;

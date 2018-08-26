const express = require("express");
const User = require("../../models/User");
const Tweet = require("../../models/Tweet");
const jwt = require("jsonwebtoken");
const key = require("../../private/secret");
const passport = require("passport");
const validateTweetInput = require("../../validation/tweet");

const router = express.Router();

router.get("/", (req, res) => {
  Tweet.find()
    .sort({ date: -1 })
    .then(tweets => res.json(tweets))
    .catch(err => res.status(404).json({ notweetsfound: "No tweets found" }));
});

router.get("/:id", (req, res) => {
  Tweet.findById(req.params.id)
    .then(tweet => res.json(tweet))
    .catch(err =>
      res.status(404).json({ notweetfound: "No tweet found with that ID" })
    );
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTweetInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newTweet = new Tweet({
      body: req.body.body
    });

    newTweet.save().then(tweet => res.json(tweet));
  }
);

module.exports = router;

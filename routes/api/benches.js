const express = require("express");
const User = require("../../models/User");
const Bench = require("../../models/Bench");
const jwt = require("jsonwebtoken");
const key = require("../../private/secret");
const passport = require("passport");
const validateBenchInput = require("../../validation/bench");

const router = express.Router();

router.get("/", (req, res) => {
  Bench.find()
    .sort({ date: -1 })
    .then(benches => res.json(benches))
    .catch(err => res.status(404).json({ nobenchesfound: "No benches found" }));
});

router.get("/:id", (req, res) => {
  Bench.findById(req.params.id)
    .then(bench => res.json(bench))
    .catch(err =>
      res.status(404).json({ nobenchfound: "No bench found with that ID" })
    );
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBenchInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newBench = new Bench({
      user: req.user.id,
      body: req.body.body,
      lat: req.body.lat,
      long: req.body.long,
      seating: req.body.seating,
      pictureURL: req.body.pictureURL
    });

    newBench.save().then(bench => res.json(bench));
  }
);

router.post(
  "/reviews/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBenchInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Bench.findById(req.params.id)
      .then(bench => {
        debugger;
        const newReview = {
          user: req.user.id,
          body: req.body.body,
          rating: req.body.rating
        };

        // Add to comments array
        bench.reviews.unshift(newReview);

        // Save
        bench.save().then(bench => res.json(bench));
      })
      .catch(err => res.status(404).json({ benchnotfound: "No bench found" }));
  }
);

module.exports = router;

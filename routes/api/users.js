const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const Bench = require("../../models/Bench");
const jwt = require("jsonwebtoken");
const key = require("../../private/secret");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const router = express.Router();

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "This user does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, handle: user.handle };

        jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email
    });
  }
);

router.post(
  "/:user/favorites/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check Validation
    if (typeof req.params.id !== "number") {
      // If any errors, send 400 with errors object
      return res.status(400).json({ errors: "Bench ID must be an integer" });
    }

    User.findById(req.params.user)
      .then(user => {
        Bench.findById(req.params.id)
          .then(bench => {
            user.favorites.unshift(bench);
          })
          .catch(err => {
            return res.status(400).json({ nobenchfound: "No bench found" });
          });

        user.save().then(user => res.json(user));
      })
      .catch(err => res.status(404).json({ usernotfound: "No user found" }));
  }
);

module.exports = router;

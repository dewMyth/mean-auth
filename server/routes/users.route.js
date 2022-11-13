const router = require("express").Router();

const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

//Register
router.post("/register", async (req, res, next) => {
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hashedPwd,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

//Authentication
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      };
      jwt.sign(
        payload,
        process.env.JWT_SECURITY_KEY,
        { expiresIn: 604800 },
        (err, token) => {
          res.status(200).json({
            success: true,
            token: "Bearer " + token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email,
            },
          });
        }
      );
    } else {
      return res.status(400).json({
        error: "Password is incorrect",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

//Profile
// Header -> Authorization: Bearer <token>
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      user: req.user,
    });
  }
);

//Get User
//Profile
// Header -> Authorization: Bearer <token>
router.get(
  "/find/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;

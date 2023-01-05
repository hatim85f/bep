const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Admin = require("../../models/Admin");

// getting user profile
// access   Private needs login token
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne({ userEmail: req.body.email }).select(
      "-password"
    );
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//@route    POST api/auth
//@des      Authenticate users and get the token
//@access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid Email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Please include a valid Email and Password" });
    }

    const { email, password } = req.body;

    // checking if user exists
    try {
      let user = await Admin.findOne({ userEmail: email });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid Username or password" });
      }

      // match user
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid Username or Password" });
      }

      // return token

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), (error, token) => {
        if (error) throw error;
        res.json({ token, user });
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

// change user password
router.put("/", auth, async (req, res) => {
  const { newPassword } = req.body;
  const salt = await bcrypt.genSalt(10);

  const updatedPassword = await bcrypt.hash(newPassword, salt);

  try {
    const user = await User.updateOne(
      { _id: req.body.userId },
      {
        $set: {
          password: updatedPassword,
        },
      }
    );
    return res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;

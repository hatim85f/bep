const express = require("express");
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const router = express.Router();
const auth = require("../../middleware/auth");

const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  return res.status(200).send("Get is Working");
});

router.post("/", auth, async (req, res) => {
  const { firstName, lastName, userEmail, password, adminType } = req.body;

  try {
    let admin = await Admin.findOne({ userEmail });

    if (admin) {
      return res
        .status(400)
        .json({ error: "Warning !", message: "Admin already exists" });
    }

    const newAdmin = new Admin({
      firstName,
      lastName,
      userEmail,
      password,
      adminType,
    });

    const salt = await bcrypt.genSalt(10);

    newAdmin.password = await bcrypt.hash(password, salt);

    await newAdmin.save();

    return res
      .status(200)
      .send({ message: `Admin ${firstName} ${lastName} added Successfully` });
  } catch (error) {
    return res.status(500).send({
      error: "Error !",
      message: error.message,
    });
  }
});

module.exports = router;

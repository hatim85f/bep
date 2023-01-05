const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Admin = require("../../models/Admin");

router.get("/", auth, async (req, res) => {
  const { userId } = req.query;
  try {
    const admins = await Admin.find({
      _id: { $ne: userId },
    });

    return res.status(200).json({ admins });
  } catch (error) {
    return res.status(500).send({
      error: "Error !",
      message: error.message,
    });
  }
});

module.exports = router;

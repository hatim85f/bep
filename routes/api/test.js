const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.status(200).send("Hello, test is running");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;

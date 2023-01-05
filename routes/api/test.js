const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).send("Test is wroking");
});

router.post("/", async (req, res) => {
  const { message } = req.body;

  return res.status(200).send(message);
});

module.exports = router;

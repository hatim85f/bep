const express = require("express");
const Comment = require("../../models/Comment");
const Form = require("../../models/Form");
const router = express.Router();

router.get("/form", async (req, res) => {
  try {
    const forms = await Form.find();

    return res.status(200).json({ forms });
  } catch (error) {
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});

router.post("/form", async (req, res) => {
  const { name, email, mobile, whatsApp, message } = req.body;

  try {
    const newForm = new Form({
      name,
      email,
      mobile,
      whatsApp,
      message,
    });
    await Form.insertMany(newForm);

    return res.status(200).send({
      message:
        "Thank you for reaching us, One of hour admins will contact you soon",
    });
  } catch (error) {
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});

router.get("/comment", async (req, res) => {
  const comments = await Comment.find();
  try {
    return res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});

router.post("/comment", async (req, res) => {
  const { name, email, website, comment } = req.body;

  try {
    const newComment = new Comment({
      name,
      email,
      website,
      comment,
    });
    await Form.insertMany(newComment);

    return res.status(200).send({
      message: "Thank you for reaching us",
    });
  } catch (error) {
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});

module.exports = router;

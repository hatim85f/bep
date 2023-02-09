const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Event = require("../../models/Event");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json({ events });
  } catch (error) {
    return res.status(500).send({
      error: "Error !",
      message: error.mesasge,
    });
  }
});

router.post("/", auth, async (req, res) => {
  const { imageURL, program, date, location, client } = req.body;

  try {
    const newEvent = new Event({
      imageURL,
      program,
      date,
      client,
      location,
    });

    await Event.insertMany(newEvent);

    return res.status(200).send({ message: "Event Added Succussfully" });
  } catch (error) {
    return res.status(500).send({
      error: "Error !",
      message: error.mesasge,
    });
  }
});

router.put("/", auth, async (req, res) => {
  const { imageURL, program, date, location, client, eventId } = req.body;

  try {
    await Event.updateMany(
      { _id: eventId },
      {
        $set: {
          imageURL,
          program,
          date,
          client,
          location,
        },
      }
    );

    return res.status(200).send({ message: "Event Updated Succussfully" });
  } catch (error) {
    return res.status(500).send({
      error: "Error !",
      message: error.mesasge,
    });
  }
});

router.delete("/", auth, async (req, res) => {
  const { eventId } = req.body;

  try {
    await Event.deleteOne({ _id: eventId });
  } catch (error) {
    return res.status(500).send({
      error: "Error !",
      message: error.mesasge,
    });
  }
});

module.exports = router;

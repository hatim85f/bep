const express = require("express");
const About = require("../../models/About");
const router = express.Router();
const auth = require("../../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const about = await About.find();

    return res.status(200).json({ about });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.post("/", auth, async (req, res) => {
  const { about } = req.body;

  try {
    const newAbout = new About({
      mainMessage: about.mainMessage,
      mission: about.mission,
      vision: about.vision,
      philosophy: about.philosophy,
      values: about.values,
      founderMessage: about.founderMessage,
      founder: about.founder,
      team: about.team,
    });

    await About.insertMany(newAbout);

    return res
      .status(200)
      .send({ message: "Company Profile Updated Successfully " });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.put("/", auth, async (req, res) => {
  const { about, aboutId } = req.body;

  try {
    await About.updateMany(
      { _id: aboutId },
      {
        $set: {
          mainMessage: about.mainMessage,
          mission: about.mission,
          vision: about.vision,
          philosophy: about.philosophy,
          values: about.values,
          founderMessage: about.founderMessage,
          founder: about.founder,
          team: about.team,
        },
      }
    );
    return res
      .status(200)
      .send({ message: "Company Profile Updated Successfully " });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.delete("/", auth, async (req, res) => {
  const { aboutId } = req.body;
  try {
    await About.deleteMany({ _id: aboutId });
    return res
      .status(200)
      .send({ message: "Company Profile Deleted Successfully " });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

module.exports = router;

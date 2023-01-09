const express = require("express");
const auth = require("../../middleware/auth");
const Groups = require("../../models/Groups");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const groups = await Groups.find();

    return res.status(200).json({ groups });
  } catch (error) {
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});

router.post("/", auth, async (req, res) => {
  const { groupData } = req.body;

  try {
    const newGroup = new Groups({
      groupName: groupData.groupName,
      startingDate: groupData.startingDate,
      endingDate: groupData.endingDate,
      course: groupData.course,
      participants: groupData.participants,
    });

    await Groups.insertMany(newGroup);

    return res.status(200).send({ message: "New group added successfully" });
  } catch (error) {
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});

module.exports = router;

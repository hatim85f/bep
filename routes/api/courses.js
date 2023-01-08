const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Courses = require("../../models/Courses");

router.get("/", async (req, res) => {
  try {
    const courses = await Courses.find();

    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).send({
      error: "Error",
      message: "Something Went wrong, Please try again later",
    });
  }
});

router.post("/", auth, async (req, res) => {
  const { courseDetails } = req.body;

  try {
    const previous = await Courses.findOne({
      $or: [
        { name: courseDetails.name },
        { abbreviation: courseDetails.abbreviation },
      ],
    });

    if (previous) {
      return res.status(500).send({
        error: "Error",
        message: "A course with the same name added already exists",
      });
    }
    const newCourse = await new Courses({
      name: courseDetails.name,
      description: courseDetails.description,
      image: courseDetails.image,
      abbreviation: courseDetails.abbreviation,
      price: courseDetails.price,
      offerPrice: 0,
      learningObjective: courseDetails.learningObjective,
      modules: courseDetails.modules,
      numberOfSessions: courseDetails.numberOfSessions,
      numberOfHours: courseDetails.numberOfHours,
      frequency: courseDetails.frequency,
      brochure: courseDetails.brochure,
      targetdPeople: [],
      activeUsers: [],
      completedUsers: [],
      targetedParticipants: courseDetails.targetedParticipants,
      category: courseDetails.category,
    });

    await Courses.insertMany(newCourse);

    return res.status(200).send({ message: "New Course added Successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});

module.exports = router;

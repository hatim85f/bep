const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const auth = require("../../middleware/auth");
const Courses = require("../../models/Courses");
const Groups = require("../../models/Groups");
const User = require("../../models/User");

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

router.put("/pass_student", auth, async (req, res) => {
  const { userId, groupId, paymentIndex } = req.body;

  try {
    const group = await Groups.findOne({ _id: groupId });
    const courseId = group.course;

    const user = await User.findOne({ _id: userId });

    const userPayments = user.payments;

    const course = await Courses.findOne({ _id: courseId });

    userPayments.splice(paymentIndex, 1);

    await User.updateMany(
      { _id: userId },
      {
        $pull: {
          activeCourses: {
            course: group.course,
          },
        },
        $addToSet: {
          history: {
            courseId: courseId,
            courseName: course.name,
            groupName: group.groupName,
            groupId: group._id,
            pass: true,
            startingDate: group.startingDate,
            endingDate: group.endingDate,
            ceftificate: "",
          },
        },
        $set: {
          payments: userPayments,
        },
      }
    );
    return res.status(200).send({ message: "User Details Updated" });
  } catch (error) {
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});
module.exports = router;

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

// getting users active courses
router.get("/active", auth, async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findOne({ _id: userId });
    const activeCourses = user.activeCourses;

    let active = [];
    for (let data in activeCourses) {
      const course = await Courses.findOne({ _id: activeCourses[data].course });

      const group = await Groups.findOne({
        course: course._id,
        "participant.userId": userId,
      });

      active.push({
        _id: activeCourses[data].course,
        courseName: course.name,
        startingDate: group.startingDate,
        endingDate: group.endingDate,
        groupName: group.groupName,
      });
    }

    return res.status(200).json({ active });
  } catch (error) {
    return res.status(500).send({ error: "Error !", message: error.message });
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

router.put("/", auth, async (req, res) => {
  const { course, courseId } = req.body;

  try {
    const {
      abbreviation,
      brochure,
      frequency,
      learningObjective,
      modules,
      name,
      numberOfHours,
      numberOfSessions,
      image,
      offerPrice,
      price,
      targetedParticipants,
    } = course;
    await Courses.updateMany(
      { _id: courseId },
      {
        $set: {
          abbreviation,
          brochure,
          frequency,
          learningObjective,
          modules,
          name,
          numberOfHours,
          numberOfSessions,
          image,
          offerPrice,
          price,
          targetedParticipants,
          lastUpdated: moment(new Date()).format("DD/MM/YYYY hh:mm a"),
        },
      }
    );

    return res
      .status(200)
      .send({ message: `Program ${name} updated Successfully` });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.delete("/", auth, async (req, res) => {
  const { courseId } = req.body;

  try {
    await Courses.deleteMany({ _id: courseId });

    return res.status(200).send({ message: `Program deleted Successfully` });
  } catch (error) {
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});
module.exports = router;

const express = require("express");
const auth = require("../../middleware/auth");
const Courses = require("../../models/Courses");
const User = require("../../models/User");
const Groups = require("../../models/Groups");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();

    let userPaymetns = [];

    for (let data in users) {
      for (let items in users[data].payments) {
        const course = await Courses.findOne({
          _id: users[data].payments[items].courseId,
        });

        userPaymetns.push({
          courseId: users[data].payments[items].courseId,
          requiredPayments: users[data].payments[items].requiredPayments,
          isOffered: users[data].payments[items].isOffered,
          offerPrice: users[data].payments[items].offerPrice,
          status: users[data].payments[items].status,
          receipt: users[data].payments[items].receipt,
          isScheduled: users[data].payments[items].isScheduled,
          courseName: course.name,
          userId: users[data]._id,
          userName: users[data].firstName + " " + users[data].lastName,
          userPhone: users[data].phone,
          firstName: users[data].firstName,
          lastName: users[data].lastName,
        });
      }
    }
    return res.status(200).json({ payments: userPaymetns });
  } catch (error) {
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});

// get user payments details and groups
router.get("/user", auth, async (req, res) => {
  const { userId, courseId } = req.query;

  try {
    const user = await User.findOne({ _id: userId });
    const userPayments = user.payments;

    const group = await Groups.findOne({
      course: courseId,
      "participants.userId": userId,
    });

    const participants = group.participants;

    return res.status(200).send({ userPayments, participants });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.put("/", auth, async (req, res) => {
  const { paymentDetails, paymentIndex, receipt, participantIndex } = req.body;

  try {
    const user = await User.findOne({ _id: paymentDetails.userId });

    const group = await Groups.findOne({
      course: paymentDetails.courseId,
      "participants.userId": paymentDetails.userId,
    });

    const userPayments = user.payments;
    userPayments[paymentIndex] = {
      courseId: mongoose.Types.ObjectId(paymentDetails.courseId),
      requiredPayments: paymentDetails.requiredPayments,
      isOffered: paymentDetails.isOffered,
      offerPrice: 0,
      status: "Paid",
      receipt: receipt,
      isScheduled: paymentDetails.isScheduled,
      courseName: userPayments[paymentIndex].courseName,
      completed: userPayments[paymentIndex].completed,
    };

    await User.updateMany(
      { _id: paymentDetails.userId },
      {
        $set: {
          payments: userPayments,
        },
      }
    );

    const groupParticipants = group.participants;

    groupParticipants[participantIndex] = {
      userId: groupParticipants[participantIndex].userId,
      payments: "Paid",
      attendance: groupParticipants[participantIndex].attendance,
      assigments: [],
      pass: false,
      name: groupParticipants[participantIndex].name,
      _id: groupParticipants[participantIndex]._id,
    };

    await Groups.updateMany(
      {
        course: paymentDetails.courseId,
        "participants.userId": paymentDetails.userId,
      },
      {
        $set: {
          participants: groupParticipants,
        },
      }
    );

    return res.status(200).send({ message: "Payment Updated Successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});

module.exports = router;

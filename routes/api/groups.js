const express = require("express");
const auth = require("../../middleware/auth");
const Groups = require("../../models/Groups");
const User = require("../../models/User");
const Courses = require("../../models/Courses");
const Notifications = require("../../models/Notifications");
const router = express.Router();

const moment = require("moment");

router.get("/", auth, async (req, res) => {
  try {
    const groups = await Groups.aggregate([
      {
        $lookup: {
          from: "courses",
          foreignField: "_id",
          localField: "course",
          as: "courseData",
        },
      },
      {
        $project: {
          _id: 1,
          groupName: 1,
          course: 1,
          startingDate: 1,
          endingDate: 1,
          participants: 1,
          "courseData.name": 1,
        },
      },
    ]);

    const neededGroups = groups.map((a) => {
      return {
        _id: a._id,
        groupName: a.groupName,
        startingDate: a.startingDate,
        endingDate: a.endingDate,
        participants: a.participants.length,
        courseName: a.courseData[0].name,
        groupParticipants: a.participants,
        course: a.course,
      };
    });

    return res.status(200).json({ groups: neededGroups });
  } catch (error) {
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});

// get sinle user details to update his payments
router.get("/single", auth, async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findOne({ _id: userId });

    const userPayments = user.payments;

    return res.status(200).json({ userPayments });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
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

router.put("/student", auth, async (req, res) => {
  const { userId, groupId, courseId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    const group = await Groups.findOne({ _id: groupId });
    const course = await Courses.findOne({ _id: courseId });

    const previouslyFound = await Groups.findOne({
      _id: groupId,
      "participants.userId": userId,
    });

    if (previouslyFound) {
      return res.status(500).send({
        error: "Error !",
        message: "You are previously registered in the same group",
      });
    }

    const groupParticipants = group.participants;
    const numberOfParticipants = groupParticipants.length;

    const studentCode = `${course.abbreviation}${moment(new Date()).format(
      "YY"
    )}${moment(new Date()).format("MM")}${
      parseInt(numberOfParticipants) + 1 < 10
        ? `0${parseInt(numberOfParticipants) + 1}`
        : parseInt(numberOfParticipants) + 1
    }`;

    await Groups.updateMany(
      { _id: groupId },
      {
        $addToSet: {
          participants: {
            userId: userId,
            name: user.firstName + " " + user.lastName,
            code: studentCode,
          },
        },
      }
    );

    await User.updateMany(
      { _id: userId },
      {
        $addToSet: {
          payments: {
            courseId: group.course,
            courseName: course.name,
            requiredPayments: course.price,
            isOffered: false,
            offerPrice: 0,
            status: "pending",
            completed: false,
          },
          activeCourses: {
            course: group.course,
          },
        },
      }
    );

    const newNotification = new Notifications({
      userId: userId,
      message: `User ${user.firstName} ${user.lastName} enrolled in ${group.groupName} group`,
      userName: `${user.firstName} ${user.lastName}`,
      time: moment(new Date()).format("DD/MM/YYYY hh:mm"),
      whatsApp: user.whatsApp,
      phone: user.phone,
      course: course.name,
      type: "Enroll to a course",
    });

    await Notifications.insertMany(newNotification);

    return res.status(200).send({
      message:
        "You are enrolled Successfully, One of our admins will contact you soon on your registered WahtsApp Number",
    });
  } catch (error) {
    return res.status(200).send({ message: error.message });
  }
});

// adding participnats to group data by admin
router.put("/students", auth, async (req, res) => {
  const { students, groupId, index } = req.body;

  try {
    const group = await Groups.findOne({ _id: groupId });

    const groupParticipants = group.participants;

    const startingDate = group.startingDate.split("/")[1];
    const groupYear = group.startingDate.split("/")[2];

    const isFound = groupParticipants.find((x) => x.userId === students._id);

    if (isFound) {
      return res.status(500).send({
        error: "Dupliacte Data",
        message: `Student ${students.name} is already registered in this group`,
      });
    }
    const courseData = await Courses.findOne({ _id: group.course });

    const numberOfParticipants = groupParticipants.length;

    const studentIndex = index + 1;

    await User.updateMany(
      { _id: students._id },
      {
        $addToSet: {
          payments: {
            courseId: group.course,
            courseName: courseData.name,
            requiredPayments: courseData.price,
            isOffered: false,
            offerPrice: 0,
            status: "pending",
            completed: false,
          },
          activeCourses: {
            course: group.course,
          },
        },
      }
    );

    await Groups.updateMany(
      { _id: groupId },
      {
        $addToSet: {
          participants: {
            userId: students._id,
            name: students.name,
            code: `${courseData.abbreviation}${groupYear}${startingDate}${
              parseInt(numberOfParticipants) + studentIndex < 10
                ? `0${parseInt(numberOfParticipants) + studentIndex}`
                : parseInt(numberOfParticipants) + studentIndex
            }`,
          },
        },
      }
    );

    return res.status(200).send({ status: "Done" });
  } catch (error) {
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});

// adding participants to group data
// router.put("/students", auth, async (req, res) => {
//   const { students, groupId } = req.body;

//   try {
//     const group = await Groups.findOne({ _id: groupId });

//     const groupParticipants = group.participants;

//     const difference = students.filter(
//       (a) => !groupParticipants.some((s) => a._id === s.userId.toString())
//     );

//     const courseData = await Courses.findOne({ _id: group.course });

//     const numberOfParticipants = groupParticipants.length;

//     const studentCode = `${courseData.abbreviation}${moment(new Date()).format(
//       "YY"
//     )}${moment(new Date()).format("MM")}${
//       parseInt(numberOfParticipants) + 1 < 10
//         ? `0${parseInt(numberOfParticipants) + 1}`
//         : parseInt(numberOfParticipants) + 1
//     }`;

//     for (let data in difference) {
//       await User.updateMany(
//         { _id: students[data]._id },
//         {
//           $addToSet: {
//             payments: {
//               courseId: group.course,
//               courseName: courseData.name,
//               requiredPayments: courseData.price,
//               isOffered: false,
//               offerPrice: 0,
//               status: "pending",
//               completed: false,
//             },
//             activeCourses: {
//               course: group.course,
//             },
//           },
//         }
//       );

//       await Groups.updateMany(
//         { _id: groupId },
//         {
//           $addToSet: {
//             participants: {
//               userId: difference[data]._id,
//               name: difference[data].name,
//               code: studentCode,
//             },
//           },
//         }
//       );
//     }

//     return res.status(200).send({ message: "Group Updated Scuccessfully" });
//   } catch (error) {
//     return res.status(500).send({ error: "Error !", message: error.message });
//   }
// });

router.put("/attendance", auth, async (req, res) => {
  const { groupId, newAttendance } = req.body;

  try {
    await Groups.updateMany(
      { _id: groupId },
      {
        $set: {
          participants: newAttendance,
        },
      }
    );

    return res
      .status(200)
      .send({ message: "Group Attendance updated successfully " });
  } catch (error) {
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});

module.exports = router;

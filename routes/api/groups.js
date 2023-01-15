const express = require("express");
const auth = require("../../middleware/auth");
const Groups = require("../../models/Groups");
const User = require("../../models/User");
const Courses = require("../../models/Courses");
const router = express.Router();

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

// adding participants to group data
router.put("/students", auth, async (req, res) => {
  const { students, groupId } = req.body;

  try {
    const group = await Groups.findOne({ _id: groupId });

    const groupParticipants = group.participants;

    const difference = students.filter(
      (a) => !groupParticipants.some((s) => a._id === s.userId.toString())
    );

    const courseData = await Courses.findOne({ _id: group.course });

    for (let data in difference) {
      await User.updateMany(
        { _id: students[data]._id },
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
              userId: difference[data]._id,
              name: difference[data].name,
            },
          },
        }
      );
    }

    return res.status(200).send({ message: "Group Updated Scuccessfully" });
  } catch (error) {
    return res.status(500).send({ error: "Error !", message: error.message });
  }
});

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

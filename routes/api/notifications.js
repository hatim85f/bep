const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Courses = require("../../models/Courses");
const Notifications = require("../../models/Notifications");
const User = require("../../models/User");

const moment = require("moment");

router.get("/", auth, async (req, res) => {
  try {
    const notifications = await Notifications.find();

    return res.status(200).json({ notifications });
  } catch (error) {
    return res.status(500).send({
      error: "Error",
      message: error.message,
    });
  }
});

router.post("/", auth, async (req, res) => {
  const { userId, courseId, message } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    const course = await Courses.findOne({ _id: courseId });

    const newNotification = new Notifications({
      userId: userId,
      message: message,
      time: moment(new Date()).format("DD/MM/YYYY hh:mm"),
      course: course.name,
      whatsApp: user.whatsApp,
      phone: user.phone,
      userName: `${user.firstName} ${user.lastName}`,
    });

    await Notifications.insertMany(newNotification);

    return res.status(200).send({
      message:
        "Notification has been sent to our admins, and one of them will contact you soon on your registered WhatsApp number",
    });
  } catch (error) {
    return res.status(500).send({
      error: "Error",
      message: error.message,
    });
  }
});

module.exports = router;

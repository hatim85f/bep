const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const moment = require("moment");

// getting user data for his own purpose
router.get("/", async (req, res) => {
  try {
    const user = await User.findOne({ userEmail: req.query.userEmail });

    if (!user) {
      return res.status(500).send({
        error: "Error !",
        message: "Invalid Username or Password",
      });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).send({
      error: "Error Occured !",
      message: err.message,
    });
  }
});

// get all users for the admin
router.get("/customers", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (users.length === 0) {
      return res.status(500).send({
        error: "Error",
        message: "There is no users added",
      });
    }

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send({
      error: "Error",
      message: error.message,
    });
  }
});

// posting users data to the server
router.post("/", async (req, res) => {
  const { userDetails } = req.body;

  try {
    const isUser = await User.findOne({ userEmail: userDetails.userEmail });

    if (isUser) {
      return res.status(500).send({
        error: "Error",
        message:
          'This Email is already registered, Please Click "Forget Password" to Reset',
      });
    }

    const referredPerson = await User.findOne({
      userEmail: userDetails.referredBy,
    });

    const salt = await bcrypt.genSalt(10);

    const newPassword = userDetails.password;

    const updatedPassword = await bcrypt.hash(newPassword, salt);

    const newUser = new User({
      userEmail: userDetails.userEmail,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      userName: userDetails.userName,
      password: updatedPassword,
      whatsApp: userDetails.whatsAppNum,
      source:
        userDetails.source === "One of our admins"
          ? userDetails.adminName
          : userDetails.source,
      image: userDetails.image,
      linkedin: userDetails.linkedin,
      phone: userDetails.phone,
      gender: userDetails.gender,
      country: userDetails.country,
      nationality: userDetails.nationality,
      courses: userDetails.courses,
      certificates: userDetails.certificates,
      wishList: userDetails.wishList,
      currentCompany: userDetails.currentCompany,
      position: userDetails.position,
      experience: userDetails.experience,
      DOB: userDetails.DOB,
      payments: userDetails.payments,
      hsitory: userDetails.hsitory,
      trainerRatings: userDetails.trainerRatings,
      activeCourses: userDetails.activeCourses,
      referredBy: referredPerson ? referredPerson._id : null,
      aspiration: userDetails.aspiration,
      status: userDetails.status,
    });

    await User.insertMany(newUser);

    return res.status(200).send({ message: "Your data added Successfully" });
  } catch (err) {
    return res.status(500).send({
      error: "Error Occured !",
      message: err.message,
    });
  }
});

// admin adding users with excel
router.post("/all_users", auth, async (req, res) => {
  const { users } = req.body;

  try {
    const oldUser = await User.findOne({ userEmail: users.phone });

    if (oldUser) {
      return res.status(500).send({
        error: "Douplicated Data",
        message: `User ${oldUser.firstName} ${oldUser.lastName} already exisits`,
      });
    }

    const salt = await bcrypt.genSalt(10);

    const newPassword = users.password;

    const updatedPassword = await bcrypt.hash(newPassword, salt);

    const newUser = new User({
      userEmail: users.userEmail,
      firstName: users.firstName,
      lastName: users.lastName,
      userName: users.userName,
      password: updatedPassword,
      whatsApp: users.whatsAppNum,
      source: users.source,
      image: users.image,
      phone: users.phone,
      gender: users.gender,
      country: users.country,
      nationality: users.nationality,
      courses: users.courses,
      certificates: users.certificates,
      wishList: users.wishList,
      currentCompany: users.currentCompany,
      position: users.position,
      experience: users.experience,
      DOB: users.DOB,
      payments: users.payments,
      hsitory: users.hsitory,
      trainerRatings: users.trainerRatings,
      activeCourses: users.activeCourses,
      aspiration: users.aspiration,
      status: users.status,
      adminFeedback: users.adminFeedback,
    });

    await User.insertMany(newUser);

    return res.status(200).send({ message: "Users Added Successfully" });
  } catch (error) {
    return res.status(500).send({
      error: "Error",
      message: error.message,
    });
  }
});

router.put("/feedback", auth, async (req, res) => {
  const { userId, feedback, admin } = req.body;

  try {
    await User.updateMany(
      { _id: userId },
      {
        $push: {
          adminFeedback: {
            feedback: feedback,
            date: moment(new Date()).format("DD/MM/YYYY  hh:mm A"),
            by: admin,
          },
        },
      }
    );

    return res.status(200).send({ message: "Feedback added Successfully" });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.put("/rating", auth, async (req, res) => {
  const { userId, rating, admin } = req.body;

  try {
    await User.updateMany(
      { _id: userId },
      {
        $push: {
          trainerRatings: {
            rating: rating,
            date: moment(new Date()).format("DD/MM/YYYY  hh:mm A"),
            by: admin,
          },
        },
      }
    );

    return res.status(200).send({ message: "Rating added Successfully" });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

module.exports = router;

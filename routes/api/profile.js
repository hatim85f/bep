const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");
const Groups = require("../../models/Groups");
const User = require("../../models/User");
const moment = require("moment");
const Admin = require("../../models/Admin");

router.get("/", auth, async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(500).send({
        error: "Error Occured",
        message:
          "There is no user registered in our data base with the same credentitals",
      });
    }

    const userCourses = user.activeCourses;

    let userGroups = [];
    for (let data in userCourses) {
      const group = await Groups.findOne({
        _id: userCourses[data].course,
        "participants.userId": user._id,
      });

      userGroups.push({
        groupName: group.groupName,
        startingDate: group.startingDate,
        endingDate: group.endingDate,
      });
    }

    const userDetails = {
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      phone: user.phone,
      whatsApp: user.whatsApp,
      gender: user.gender,
      country: user.country,
      nationality: user.nationality,
      courses: user.courses,
      certificates: user.certificates,
      wishList: user.wishList,
      payments: user.payments,
      history: user.history,
      activeCourses: userGroups,
      scheduledPayments: user.scheduledPayments,
      linkedin: user.linkedin,
      currentCompany: user.currentCompany,
      position: user.position,
      DOB: user.DOB,
      aspiration: user.aspiration,
    };

    return res.status(200).json({ userDetails });
  } catch (error) {
    return res.status(500).send({
      error: "Error Occured",
      message: error.message,
    });
  }
});

router.put("/", auth, async (req, res) => {
  const {
    firstName,
    lastName,
    image,
    phone,
    whatsApp,
    gender,
    country,
    nationality,
    wishList,
    userId,
    linkedin,
    currentCompany,
    position,
    DOB,
    aspiration,
  } = req.body;

  try {
    await User.updateMany(
      { _id: userId },
      {
        $set: {
          firstName,
          lastName,
          image,
          phone,
          whatsApp,
          gender,
          country,
          nationality,
          wishList,
          linkedin,
          currentCompany,
          position,
          DOB,
          aspiration,
        },
      }
    );

    return res.status(200).send({ message: "Your data updated Successfully" });
  } catch (error) {
    return res.status(500).send({
      error: "Error Occured",
      message: error.message,
    });
  }
});

router.put("/certificate", auth, async (req, res) => {
  const { studentId, certificate, courseName, adminId } = req.body;

  try {
    const admin = await Admin.findOne({ _id: adminId });
    await User.updateMany(
      { _id: studentId },
      {
        $addToSet: {
          certificates: {
            upload_date: moment(new Date()).format("DD/MM/YYYY"),
            uploadedBy: admin.firstName + admin.lastName,
            program: courseName,
            certificate: certificate,
          },
        },
      }
    );



    return res.status(200).send({ message : `Certificate Uploaded Successfully by ${admin.firstName} ${admin.lastName}`})
  } catch (error) {
    return res.status(500).send({
      error: "Error Occured",
      message: error.message,
    });
  }
});

module.exports = router;

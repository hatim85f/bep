const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  userEmail: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  source: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  whatsApp: {
    type: String,
  },
  gender: {
    type: String,
  },
  country: {
    type: String,
  },
  nationality: {
    type: String,
  },
  adminFeedback: {
    type: Array,
  },
  linkedin: {
    type: String,
  },
  courses: [
    {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
  ],
  certificates: {
    type: Array,
  },
  wishList: {
    type: Array,
  },
  currentCompany: {
    type: String,
  },
  position: {
    type: String,
  },
  experience: {
    type: Number,
  },
  DOB: {
    type: String,
  },
  payments: {
    type: Array,
  },
  history: {
    type: Array,
  },
  trainerRatings: {
    type: Array,
  },
  activeCourses: {
    type: Array,
  },
  referredBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  aspiration: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = User = mongoose.model("user", UserSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const CourseSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  targeted_people: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  users_planned: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  attended: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  completed: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  category: {
    type: String,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  offer_price: {
    type: Number,
  },
  duration: {
    type: String,
    required: true,
  },
  sessions_number: {
    type: Number,
    required: true,
  },
  question: {
    type: Array,
  },
  comments: {
    type: Array,
  },
});

module.exports = Courses = model("course", CoursesSchema);

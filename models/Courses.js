const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const CoursesSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    tpye: String,
  },
  image: {
    type: String,
    required: true,
  },
  abbreviation: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offerPrice: {
    type: Number,
  },
  learningObjective: {
    title: {
      type: String,
    },
    objectives: {
      type: Array,
    },
  },
  modules: [
    {
      moduleName: {
        type: String,
      },
      points: {
        type: Array,
      },
    },
  ],
  numberOfSessions: {
    type: Number,
    required: true,
  },
  numberOfHours: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  brochure: {
    type: String,
  },
  targetedPeople: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  activeUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  completedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  targetedParticipants: {
    type: String,
  },
  category: {
    type: String,
  },
});

module.exports = Courses = model("course", CoursesSchema);

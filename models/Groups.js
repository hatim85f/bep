const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = Schema({
  groupName: {
    type: String,
    required: true,
  },
  startingDate: {
    type: String,
    required: true,
  },
  endingDate: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "course",
  },
  participants: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      payments: {
        type: String,
        default: "pending",
      },
      attendance: {
        type: Array,
      },

      pass: {
        type: Boolean,
        default: false,
      },
      name: {
        type: String,
      },
      code: {
        type: String,
      },
    },
  ],
});

module.exports = Groups = mongoose.model("group", GroupSchema);

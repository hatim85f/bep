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
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      payments: {
        type: Array,
      },
      attendance: {
        type: Array,
      },
      assigments: {
        type: Array,
      },
      pass: {
        type: Boolean,
      },
    },
  ],
});

module.exports = Groups = mongoose.model("group", GroupSchema);

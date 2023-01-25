const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  message: {
    type: String,
    required: true,
  },
  whatsApp: {
    type: String,
  },
  phone: {
    type: String,
  },
  time: {
    type: String,
  },
  course: {
    type: String,
  },
  userName: {
    type: String,
  },
});

module.exports = Notification = mongoose.model(
  "notification",
  NotificationSchema
);

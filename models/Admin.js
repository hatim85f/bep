const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  adminType: {
    type: String,
    default: "admin",
  },
  profilePicture: {
    type: String,
  },
});

module.exports = Admin = mongoose.model("admin", AdminSchema);

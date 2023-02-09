const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  whatsApp: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = Form = mongoose.model("form", FormSchema);

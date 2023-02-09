const monogoose = require("mongoose");
const Schema = monogoose.Schema;

const EventSchema = Schema({
  imageURL: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
});

module.exports = Event = monogoose.model("event", EventSchema);

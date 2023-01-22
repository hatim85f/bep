const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutSchema = Schema({
  mainMessage: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  philosophy: {
    type: String,
    required: true,
  },
  values: {
    type: Array,
  },
  founderMessage: {
    type: String,
    required: true,
  },
  founder: {
    name: {
      type: String,
      required: true,
    },
    certificate: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    history: {
      type: Array,
    },
  },
  team: [
    {
      name: {
        type: String,
      },
      image: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  ],
});

module.exports = About = mongoose.model("about", AboutSchema);

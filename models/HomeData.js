const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeDataSchema = Schema({
  title: {
    type: String,
    requried: true,
  },
  details: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  articleImage: {
    type: String,
  },
  articleDescription: {
    type: String,
  },
  articlePoints: [
    {
      title: {
        type: String,
      },
      subTitle: {
        type: String,
      },
      points: {
        type: Array,
      },
    },
  ],
  brochure: {
    type: String,
  },
});
module.exports = HomeData = mongoose.model("homeData", HomeDataSchema);

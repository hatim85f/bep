const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
  },
  date: {
    type: String,
  },
  by: {
    type: String,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "artilce_category",
  },
  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
      date: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
  articleDetails: [
    {
      subTitleArabic: {
        type: String,
      },
      subTitleEnglish: {
        type: String,
      },
      details: {
        type: String,
      },
    },
  ],
});

module.exports = Article = mongoose.model("article", ArticleSchema);

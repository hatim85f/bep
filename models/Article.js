const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = Schema({
  category: {
    type: String,
    required: true,
  },
  headLine: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
  },
  articleBody: [
    {
      title: {
        type: String,
        required: true,
      },
      paragraphImage: {
        type: String,
      },
      points: [],
      paragraph: {
        type: String,
      },
      icon: {
        type: String,
      },
    },
  ],
  comments: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
      userName: {
        type: String,
      },
      comment: {
        type: String,
      },
      likes: [
        {
          userId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
          },
          userName: {
            type: String,
          },
        },
      ],
    },
  ],
  by: {
    type: mongoose.Types.ObjectId,
    ref: "admin",
  },
  byName: {
    type: String,
  },
  date: {
    type: String,
  },
  likes: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    },
  ],
});

module.exports = Article = mongoose.model("article", ArticleSchema);

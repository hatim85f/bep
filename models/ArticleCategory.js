const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleCategorySchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = ArticleCategory = mongoose.model(
  "article_category",
  ArticleCategorySchema
);

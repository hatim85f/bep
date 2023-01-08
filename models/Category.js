const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = Category = mongoose.model("category", CategorySchema);

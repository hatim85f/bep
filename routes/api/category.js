const express = require("express");
const auth = require("../../middleware/auth");
const Category = require("../../models/Category");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({ categories });
  } catch (error) {
    return res.status().send({
      error: "Error",
      message: error.message,
    });
  }
});

router.post("/", auth, async (req, res) => {
  const { category } = req.body;

  try {
    const newCategory = new Category({
      name: category.name,
      description: category.description,
    });

    await Category.insertMany(category);

    return res
      .status(200)
      .send({ message: `Category ${category.name} added Successfully` });
  } catch (error) {
    return res.status().send({
      error: "Error",
      message: error.message,
    });
  }
});

module.exports = router;

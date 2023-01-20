const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const HomeData = require("../../models/HomeData");

router.get("/", auth, async (req, res) => {
  try {
    const homeItems = await HomeData.find();

    return res.status(200).json({ homeItems });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.post("/", auth, async (req, res) => {
  const {
    title,
    details,
    image,
    articleImage,
    articleDescription,
    articlePoints,
    brochure,
  } = req.body;

  try {
    const newHomeData = new HomeData({
      title,
      details,
      image,
      articleImage,
      articleDescription,
      articlePoints,
      brochure,
    });

    await HomeData.insertMany(newHomeData);

    return res.status(200).send({ message: "Home item added Successfully" });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.put("/", auth, async (req, res) => {
  const {
    title,
    details,
    image,
    articleImage,
    articleDescription,
    articlePoints,
    brochure,
    itemId,
  } = req.body;
  try {
    await HomeData.updateMany(
      { _id: itemId },
      {
        $set: {
          title: title,
          details: details,
          image: image,
          articleImage,
          articleDescription,
          articlePoints,
          brochure,
        },
      }
    );

    return res.status(200).send({ message: "Home item updated Successfully" });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.delete("/", auth, async (req, res) => {
  const { itemId } = req.body;

  try {
    await HomeData.deleteMany({ _id: itemId });

    const item = await HomeData.findOne({ _id: itemId });

    return res.status(200).send({ message: "Home Item deleted" });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

module.exports = router;

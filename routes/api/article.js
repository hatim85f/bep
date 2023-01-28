const express = require("express");
const Article = require("../../models/Article");
const router = express.Router();
const auth = require("../../middleware/auth");
const moment = require("moment");
const Admin = require("../../models/Admin");
const User = require("../../models/User");

router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();

    return res.status(200).json({ articles });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.post("/", auth, async (req, res) => {
  const { article, userId } = req.body;

  try {
    const admin = await Admin.findOne({ _id: userId });

    const newArticle = new Article({
      category: article.category,
      description: article.description,
      headLine: article.headLine,
      mainImage: article.mainImage,
      articleBody: article.articleBody,
      by: admin._id,
      byName: `${admin.firstName} ${admin.lastName}`,
      date: moment(new Date()).format("DD/MM/YYYY"),
    });

    await Article.insertMany(newArticle);
    return res.status(200).send({
      message: `Your Article ${article.headLine} posted Successfully`,
    });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.put("/", auth, async (req, res) => {
  const { article } = req.body;
  try {
    const admin = await Admin.findOne({ _id: userId });

    await Article.updateMany(
      { _id: article._id },
      {
        $set: {
          category: article.category,
          headLine: article.headLine,
          description: article.description,
          mainImage: article.mainImage,
          articleBody: article.articleBody,
          by: admin._id,
          byName: `${admin.firstName} ${admin.lastName}`,
          date: moment(new Date()).format("DD/MM/YYYY"),
          comments: article.comments,
          likes: article.likes,
        },
      }
    );

    return res.status(200).send({
      message: `Your Article ${article.headLine} Updated Successfully`,
    });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.put("/comments", auth, async (req, res) => {
  const { userId, comment, articleId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(500).send({
        error: "Error",
        message:
          "You need to login first to add comments, if you are not yet registered please navigate to registeration page",
      });
    }

    await Article.updateMany(
      { _id: articleId },
      {
        $addToSet: {
          comments: {
            userId: userId,
            userName: `${user.firstName} ${user.lastName}`,
            comment: comment,
          },
        },
      }
    );

    return res.status(200).send({ message: "Comment Added Successfully" });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.put("/person_like", async (req, res) => {
  const { articleId, userId, commentIndex } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    const article = await Article.findOne({ _id: articleId });
    const articleComments = article.comments;
    let newComments = articleComments;

    newComments[commentIndex].likes.push({
      userId,
      userName: `${user.firstName} ${user.lastName}`,
    });

    await Article.updateMany(
      { _id: article },
      {
        $set: {
          comments: newComments,
        },
      }
    );

    return res.status(200).send({ message: "Done" });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.put("/likes", async (req, res) => {
  const { userId, articleId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    const userName = user ? `${user.firstName} ${user.lastName}` : "annonymus";

    await Article.updateMany(
      { _id: articleId },
      {
        $addToSet: {
          likes: {
            userId: userId ? userId : null,
            userName,
          },
        },
      }
    );

    return res.status(200).send({ message: "Comment Added" });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.delete("/", auth, async (req, res) => {
  const { articleId } = req.body;

  try {
    await Article.deleteMany({ _id: articleId });

    return res.status(200).send({ message: "Article deleted" });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

router.delete("/comments", auth, async (req, res) => {
  const { userId, articleId, commentIndex } = req.body;
  try {
    const article = await Article.findOne({ _id: articleId });
    const comments = article.comments;
    let newComments = comments;
    newComments.splice(commentIndex, 1);

    await Article.updateMany(
      { _id: articleId },
      {
        $set: {
          comments: newComments,
        },
      }
    );
    return res.status(200).send({ message: "Comment Deleted !" });
  } catch (error) {
    return res.status(500).send({ error: "Error", message: error.message });
  }
});

module.exports = router;

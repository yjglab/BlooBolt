const express = require("express");
const { User, Post } = require("../models");

const { isLoggedIn } = require("./middlewares");
const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      topic: req.body.topic,
      content: req.body.content,
      UserId: req.user.id,
    });
    const resultPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });

    res.status(201).json(resultPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

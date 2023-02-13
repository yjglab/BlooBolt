const express = require("express");
const { User, Post, Userboard } = require("../models");

const { isLoggedIn } = require("./middlewares");
const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      topic: req.body.topic || "토픽 없음",
      content: req.body.content,
      UserId: req.user.id,
    });
    await Userboard.increment(
      {
        rankpoint: 10,
      },
      {
        where: {
          UserId: req.user.id,
        },
      }
    );
    const resultPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User,
          attributes: ["id", "username", "status"],
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

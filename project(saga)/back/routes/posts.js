const express = require("express");
const { Op } = require("sequelize");
const {
  Post,
  PostImage,
  User,
  Userboard,
  Comment,
  Hashtag,
} = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastPostId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastPostId, 10) };
    }
    const loadedPosts = await Post.findAll({
      where,
      limit: 12,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],

      include: [
        {
          model: User,
          attributes: ["id", "username", "role", "status"],
          include: [
            {
              model: Userboard,
              attributes: ["rank"],
            },
          ],
        },
        {
          model: User,
          as: "Prodders",
          attributes: ["id"],
        },
        {
          model: PostImage,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "username", "role", "status"],
            },
          ],
        },
      ],
    });
    res.status(201).json(loadedPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
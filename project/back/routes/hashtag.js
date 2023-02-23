const express = require("express");
const { Op } = require("sequelize");
const {
  Post,
  Hashtag,
  User,
  PostImage,
  Comment,
  UserReport,
} = require("../models");
const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastPostId, 10)) {
      where.id = {
        [Op.lt]: parseInt(req.query.lastPostId, 10),
      };
    }
    const posts = await Post.findAll({
      where,
      limit: 12,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: Hashtag,
          where: { name: decodeURIComponent(req.params.id) },
        },
        {
          model: User,
          attributes: ["id", "username", "avatar", "rank"],
          include: [
            {
              model: UserReport,
              attributes: ["reporterId"],
            },
          ],
        },

        {
          model: User,
          as: "PostProdders",
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
              attributes: ["id", "username", "role"],
            },
            {
              model: User,
              as: "CommentProdders",
              attributes: ["id"],
            },
          ],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

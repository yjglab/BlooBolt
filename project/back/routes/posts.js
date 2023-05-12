const express = require("express");
const { Op, literal, fn, col } = require("sequelize");
const {
  Post,
  PostImage,
  User,
  Comment,
  Hashtag,
  UserReport,
} = require("../models");
const router = express.Router();

// 검색 포스트 로드
router.post("/keyword/:word", async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastPostId, 10)) {
      where.id = {
        [Op.lt]: parseInt(req.query.lastPostId, 10),
      };
    }
    const word = decodeURIComponent(req.params.word);
    const loadedPosts = await Post.findAll({
      where: {
        ...where,
        [Op.or]: [
          {
            topic: {
              [Op.substring]: word,
            },
          },
          {
            content: {
              [Op.substring]: word,
            },
          },
        ],
        [Op.and]: [
          {
            blinded: false,
          },
        ],
      },
      limit: 12,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],

      include: [
        {
          model: User,
          attributes: ["id", "class", "username", "role", "avatar", "rank"],
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
              attributes: ["id", "class", "username", "role", "avatar", "rank"],
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
    res.status(201).json(loadedPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 일반 로드
router.post("/", async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastPostId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastPostId, 10) };
    }

    const loadedPosts = await Post.findAll({
      where: {
        ...where,
        [Op.and]: { unique: req.body.postUnique },
      },
      limit: 12,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],

      include: [
        {
          model: User,
          attributes: ["id", "class", "username", "role", "avatar", "rank"],
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
              attributes: ["id", "class", "username", "role", "avatar", "rank"],
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

    const allPosts = await Post.findAll({
      where: {
        [Op.and]: { unique: req.body.postUnique },
      },
      attributes: ["id", "topic"],
      include: [
        {
          model: User,
          attributes: ["id", "class", "username", "rank"],
        },
        {
          model: User,
          as: "PostProdders",
          attributes: ["id"],
        },
      ],
    });
    const loadedRecommendPosts = allPosts
      .sort((a, b) => b.PostProdders.length - a.PostProdders.length)
      .slice(0, 3);
    const loadedRecommendQuestionPosts = await Post.findAll({
      where: {
        [Op.and]: { unique: req.body.postUnique },
        class: "question",
      },
      limit: 3,
      order: literal("rand()"),
      include: [
        {
          model: User,
          attributes: ["id", "class", "username", "rank"],
        },
      ],
    });

    res.status(201).json({
      loadedPosts,
      loadedRecommendPosts,
      loadedRecommendQuestionPosts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

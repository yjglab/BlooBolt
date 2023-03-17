const express = require("express");
const multer = require("multer");
const fs = require("fs");

const {
  User,
  Post,
  PostImage,
  Hashtag,
  Comment,
  UserReport,
} = require("../models");
const { isLoggedIn } = require("./middlewares");
const path = require("path");

const router = express.Router();
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

try {
  fs.accessSync("uploads");
} catch (error) {
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage:
    process.env.NODE_ENV === "production"
      ? multerS3({
          s3: new AWS.S3(),
          bucket: "blooboltbucket",
          key(req, file, cb) {
            cb(
              null,
              `original/${Date.now()}_${encodeURIComponent(
                path.basename(file.originalname)
              )}`
            );
          },
        })
      : multer.diskStorage({
          destination(req, file, done) {
            done(null, "uploads");
          },
          filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);

            done(null, basename + "_" + new Date().getTime() + ext); // 덮어쓰기 방지
          },
        }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10mb
});

router.post(
  "/images",
  isLoggedIn,
  upload.array("postImages"),
  async (req, res, next) => {
    try {
      if (req.files.length > 6) {
        return res.status(401).send("이미지는 6장을 초과할 수 없습니다");
      }
      res.json(
        req.files.map((v) =>
          process.env.NODE_ENV === "production"
            ? v.location.replace(/\/original\//, "/thumb/")
            : v.filename
        )
      );
    } catch (error) {
      console.error(error);
    }
  }
);

// 포스트 프롯
router.patch("/:postId/prod", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 포스트입니다");
    }

    await User.increment(
      {
        rankPoint: 100,
      },
      {
        where: { id: req.body.postUserId },
      }
    );
    await post.addPostProdders(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 포스트 프롯 삭제
router.delete("/:postId/prod", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 포스트입니다");
    }
    await User.decrement(
      {
        rankPoint: 100,
      },
      {
        where: { id: post.UserId },
      }
    );
    await post.removePostProdders(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 포스트 수정
router.patch("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    await Post.update(
      {
        class: req.body.postClass,
        topic: req.body.topic.trim(),
        content: req.body.content,
        edited: true,
      },
      {
        where: {
          id: req.params.postId,
          UserId: req.user.id,
        },
      }
    );
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    const hashtags = req.body.content.match(
      /(#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*)/g
    );
    if (hashtags) {
      const resultHashtags = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } })
        )
      );
      await post.setHashtags(resultHashtags.map((v) => v[0]));
    }

    await PostImage.destroy({
      where: { PostId: req.params.postId },
    });
    let postImages = [];
    if (req.body.postImagePaths && Array.isArray(req.body.postImagePaths)) {
      postImages = await Promise.all(
        req.body.postImagePaths.map((path) => PostImage.create({ src: path }))
      );
      await post.addPostImages(postImages);
    }

    res.status(200).json({
      PostId: parseInt(req.params.postId, 10),
      class: req.body.postClass,
      topic: req.body.topic,
      content: req.body.content,
      updatedAt: post.updatedAt,
      PostImages: postImages,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 코멘트 생성
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("존재하지 않는 포스트입니다");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const resultComment = await Comment.findOne({
      where: { id: comment.id },
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
    });
    if (post.UserId !== req.user.id) {
      await User.increment(
        {
          rankPoint: 10,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
    }
    res.status(201).json(resultComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 코멘트 삭제
router.delete(
  "/:postId/comment/:commentId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      await Comment.destroy({
        where: {
          id: req.params.commentId,
          PostId: req.params.postId,
          UserId: req.user.id,
        },
      });
      if (parseInt(req.params.postId) !== req.user.id) {
        await User.decrement(
          {
            rankPoint: 10,
          },
          {
            where: {
              id: req.user.id,
            },
          }
        );
      }
      res.status(200).json({
        PostId: parseInt(req.params.postId, 10),
        CommentId: parseInt(req.params.commentId, 10),
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// 코멘트 수정
router.patch(
  "/:postId/comment/:commentId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      await Comment.update(
        {
          content: req.body.content,
        },
        {
          where: {
            id: req.params.commentId,
            PostId: req.params.postId,
            UserId: req.user.id,
          },
        }
      );

      res.status(200).json({
        content: req.body.content,
        PostId: parseInt(req.params.postId, 10),
        CommentId: parseInt(req.params.commentId, 10),
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// 코멘트 프롯
router.patch(
  "/:postId/comment/:commentId/prod",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const comment = await Comment.findOne({
        where: {
          id: req.params.commentId,
          PostId: req.params.postId,
          UserId: req.body.commentUserId,
        },
      });
      if (!comment) {
        return res.status(403).send("존재하지 않는 코멘트입니다");
      }

      await User.increment(
        {
          rankPoint: 100,
        },
        {
          where: { id: req.body.commentUserId },
        }
      );
      await comment.addCommentProdders(req.user.id);
      res.json({
        PostId: parseInt(req.params.postId, 10),
        CommentId: parseInt(req.params.commentId, 10),
        UserId: req.user.id,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// 코멘트 프롯 삭제
router.delete(
  "/:postId/comment/:commentId/prod",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const comment = await Comment.findOne({
        where: {
          id: req.params.commentId,
          PostId: req.params.postId,
        },
      });
      if (!comment) {
        return res.status(403).send("존재하지 않는 코멘트입니다");
      }
      await User.decrement(
        {
          rankPoint: 100,
        },
        {
          where: { id: comment.UserId },
        }
      );
      await comment.removeCommentProdders(req.user.id);
      res.json({
        PostId: parseInt(req.params.postId, 10),
        CommentId: parseInt(req.params.commentId, 10),
        UserId: req.user.id,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// 포스트 복구
router.patch("/:postId/revert", isLoggedIn, async (req, res, next) => {
  try {
    await Post.update(
      {
        blinded: false,
        reverted: true,
      },
      {
        where: {
          id: req.params.postId,
          UserId: req.user.id,
        },
      }
    );
    await User.increment(
      {
        rankPoint: 10,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 포스트 삭제 (블라인드/완전삭제)
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    const targetPost = await Post.findOne({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
      include: [
        {
          model: Comment,
          attributes: ["id"],
        },
      ],
    });
    if (!targetPost) {
      res.status(401).send("존재하지 않는 포스트입니다.");
    }

    if (targetPost.Comments.length === 0) {
      await targetPost.destroy();
    } else {
      await targetPost.update({
        blinded: true,
      });
    }

    await User.decrement(
      {
        rankPoint: 10,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 포스트 생성
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      unique: req.body.postUnique,
      class: req.body.postClass,
      topic: req.body.topic.trim(),
      content: req.body.content,
      UserId: req.user.id,
      // edited: false,
      // reverted: false,
      // blinded: false,
    });
    const hashtags = req.body.content.match(
      /(#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*)/g
    );
    if (hashtags) {
      const resultHashtags = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: {
              name: tag.slice(1).toLowerCase(),
            },
          })
        )
      );
      await post.addHashtags(resultHashtags.map((v) => v[0]));
    }
    await User.increment(
      {
        rankPoint: 10,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    const me = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (me.rank === 0) {
      await me.update({
        rank: 6,
      });
    }
    if (req.body.postImagePaths && Array.isArray(req.body.postImagePaths)) {
      const postImages = await Promise.all(
        req.body.postImagePaths.map((path) => PostImage.create({ src: path }))
      );
      await post.addPostImages(postImages);
    }

    const resultPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User,
          attributes: ["id", "username", "class", "role", "avatar", "rank"],
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

    res.status(201).json(resultPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:postId/detail", async (req, res, next) => {
  try {
    const targetPost = await Post.findOne({
      where: {
        id: req.params.postId,
      },
      // order: [
      //   ["createdAt", "DESC"],
      //   [Comment, "createdAt", "DESC"],
      // ],
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
    if (targetPost) {
      res.status(201).json(targetPost);
    } else {
      res.status(403).send("존재하지 않는 포스트입니다.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

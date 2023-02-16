const express = require("express");
const multer = require("multer");
const fs = require("fs");

const {
  User,
  Post,
  Userboard,
  PostImage,
  Hashtag,
  Comment,
} = require("../models");
const { isLoggedIn } = require("./middlewares");
const path = require("path");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 새로 생성합니다");
  fs.mkdirSync("uploads");
}
const upload = multer({
  storage:
    process.env.NODE_ENV === "production"
      ? ""
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
          process.env.NODE_ENV === "production" ? "" : v.filename
        )
      );
    } catch (error) {
      console.error(error);
    }
  }
);

router.patch("/:postId/prod", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 포스트입니다");
    }

    await Userboard.increment(
      {
        rankPoint: 100,
      },
      {
        where: { UserId: req.body.postUserId },
      }
    );
    await post.addProdders(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId/prod", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 포스트입니다");
    }
    await post.removeProdders(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

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
          attributes: ["id", "username", "role", "status"],
          include: [
            {
              model: Userboard,
              attributes: ["rank"],
            },
          ],
        },
      ],
    });
    res.status(201).json(resultComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: { id: req.params.postId, UserId: req.user.id },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      topic: req.body.topic.trim() ? req.body.topic : "토픽 없음",
      content: req.body.content,
      UserId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^/\s]+/g);
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
    await Userboard.increment(
      {
        rankPoint: 10,
      },
      {
        where: {
          UserId: req.user.id,
        },
      }
    );

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

    res.status(201).json(resultPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

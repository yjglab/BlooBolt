const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { User, Userboard, Post } = require("../models");
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const passport = require("passport");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
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

router.post("/signup", isNotLoggedIn, async (req, res, next) => {
  try {
    const existedEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    const existedUsername = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (existedEmail) {
      return res.status(403).send("이미 존재하는 이메일 계정입니다.");
    }
    if (existedUsername) {
      return res.status(403).send("이미 존재하는 사용자명입니다.");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      status: false,

      role: "None",
      country: "None",
      website: "None",
      about: "",

      realname: "",
      address: "",
    });

    await user.createUserboard({
      UserId: user.id,
      avatar:
        "" || process.env.NODE_ENV === "production" ? "" : "base_avatar.png",
      rank: 0,
      rankPoint: 0,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      console.error(error);
      return next(error);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.logIn(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      await User.update(
        {
          status: true,
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      const resultUser = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Userboard,
            attributes: ["avatar", "rank", "rankPoint"],
          },
          {
            model: Post,
            include: [
              {
                model: User,
                as: "Prodders",
                attributes: ["id"],
              },
            ],
          },
          {
            model: User,
            as: "Tracings",
            attributes: ["id", "username", "role"],
            include: [
              {
                model: Userboard,
                attributes: ["avatar", "rank"],
              },
            ],
          },
          {
            model: User,
            as: "Tracers",
            attributes: ["id", "username", "role"],
            include: [
              {
                model: Userboard,
                attributes: ["avatar", "rank"],
              },
            ],
          },
        ],
      });
      return res.status(200).json(resultUser);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, async (req, res, next) => {
  await User.update(
    {
      status: false,
    },
    {
      where: {
        id: req.user.id,
      },
    }
  );

  req.logout();
  req.session.destroy();
  res.send("ok");
});

router.post(
  "/avatar",
  isLoggedIn,
  upload.single("userAvatar"),
  async (req, res, next) => {
    try {
      Userboard.update(
        {
          avatar: req.file.filename,
        },
        {
          where: {
            UserId: req.user.id,
          },
        }
      );

      res.json(process.env.NODE_ENV === "production" ? "" : req.file.filename);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.patch("/:userId/info/public", isLoggedIn, async (req, res, next) => {
  try {
    if (parseInt(req.params.userId, 10) !== req.user.id) {
      return res.status(403).send("다른 사용자의 정보를 수정할 수 없습니다.");
    }
    const existedUsername = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (existedUsername) {
      return res.status(403).send("이미 존재하는 사용자명입니다.");
    }
    await User.update(
      {
        username: req.body.username,
        role: req.body.role || "None",
        country: req.body.country || "None",
        website: req.body.website || "None",
        about: req.body.about,
      },
      {
        where: { id: req.params.userId },
      }
    );
    res.status(200).json({
      username: req.body.username,
      role: req.body.role,
      country: req.body.country,
      website: req.body.website,
      about: req.body.about,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:userId/info/personal", isLoggedIn, async (req, res, next) => {
  try {
    if (parseInt(req.params.userId, 10) !== req.user.id) {
      return res.status(403).send("다른 사용자의 정보를 수정할 수 없습니다.");
    }
    await User.update(
      {
        realname: req.body.realname,
        address: req.body.address,
      },
      {
        where: { id: req.params.userId },
      }
    );
    res.status(200).json({
      realname: req.body.realname,
      address: req.body.address,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:userId/trace", isLoggedIn, async (req, res, next) => {
  try {
    const targetUser = await User.findOne({
      where: { id: req.params.userId },
      attributes: ["id", "username", "status", "role"],
      include: [
        {
          model: Userboard,
          attributes: ["rank"],
        },
      ],
    });
    if (!targetUser) {
      res.status(403).send("Trace failed: 존재하지 않는 사용자입니다.");
    }
    await Userboard.increment(
      {
        rankPoint: 100,
      },
      {
        where: { UserId: req.params.userId },
      }
    );
    const me = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "username", "status", "role"],
      include: [
        {
          model: Userboard,
          attributes: ["rank"],
        },
      ],
    });
    await targetUser.addTracers(me);
    res.status(200).json(targetUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:userId/trace", isLoggedIn, async (req, res, next) => {
  try {
    const targetUser = await User.findOne({
      where: { id: req.params.userId },
      attributes: ["id", "username", "status", "role"],
      include: [
        {
          model: Userboard,
          attributes: ["rank"],
        },
      ],
    });
    if (!targetUser) {
      res.status(403).send("Untrace failed: 존재하지 않는 사용자입니다.");
    }
    await Userboard.decrement(
      {
        rankPoint: 100,
      },
      {
        where: { UserId: req.params.userId },
      }
    );
    const me = await User.findOne({
      where: { id: req.user.id },
    });
    await targetUser.removeTracers(me.id);
    res.status(200).json({ UserId: targetUser.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { User, Post, Comment, UserReport, PostImage } = require("../models");
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const passport = require("passport");

const router = express.Router();
const nodeMailer = require("nodemailer");

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

// signup 이메일 인증
router.post("/signup/auth", isNotLoggedIn, async (req, res, next) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_APP_PASSWORD,
      },
    });

    const randomCode = Array(6)
      .fill()
      .map((v) => Math.floor(Math.random() * 10))
      .join("");

    const mailOptions = {
      to: req.body.authEmail,
      subject: "BlooBolt Support: 이메일 인증 메일입니다.",
      html: `
        BlooBolt에 오신 것을 환영합니다. 아래의 코드를 입력하고 가입을 완료하세요.<br/>
        <h4>${randomCode}</h4>
        <br/><br/>
        <span>from. BlooBolt Support</span>
        `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      code: randomCode,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
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

    const usernameFilter = [
      "관리자",
      "Admin",
      "Administrator",
      "블루볼트",
      "BlooBolt",
      "BlooBolt.co",
      "bloobolt",
      "Bloobolt",
      "blooBolt",
      "BlooBolts",
    ];

    if (usernameFilter.includes(req.body.username)) {
      return res.status(403).send("적절하지 않은 사용자명입니다.");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      class: req.body.class,
      avatar:
        "" || process.env.NODE_ENV === "production" ? "" : "base_avatar.png",
      rank: 0,
      rankPoint: 0,

      role: "None",
      country: "None",
      website: "None",
      about: "",

      realname: "",
      address: "",

      reported: 0,
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

      const resultUser = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Post,
            include: [
              {
                model: User,
                as: "PostProdders",
                attributes: ["id"],
              },
              {
                model: Comment,
                include: [
                  {
                    model: User,
                    attributes: ["id"],
                  },
                ],
              },
            ],
          },
          {
            model: User,
            as: "Tracings",
            attributes: ["id", "class", "username", "role", "avatar", "rank"],
          },
          {
            model: User,
            as: "Tracers",
            attributes: ["id", "class", "username", "role", "avatar", "rank"],
          },
        ],
      });
      return res.status(200).json(resultUser);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, async (req, res, next) => {
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
      User.update(
        {
          avatar: req.file.filename,
        },
        {
          where: {
            id: req.user.id,
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

// 타 사용자 정보 로드
router.get("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: decodeURIComponent(req.params.username),
      },
    });
    if (!user) {
      return res.status(403).send("존재하지 않는 사용자입니다.");
    }

    const resultUser = await User.findOne({
      where: { username: decodeURIComponent(req.params.username) },
      attributes: {
        exclude: ["password", "email", "realname", "address", "reported"],
      },
      include: [
        {
          model: Post,
          include: [
            {
              model: Comment,
              include: [
                {
                  model: User,
                  attributes: ["id"],
                },
              ],
            },
            {
              model: User,
              as: "PostProdders",
              attributes: ["id"],
            },
          ],
        },
        {
          model: User,
          as: "Tracings",
          attributes: ["id", "class", "username", "role", "avatar", "rank"],
        },
        {
          model: User,
          as: "Tracers",
          attributes: ["id", "class", "username", "role", "avatar", "rank"],
        },
      ],
    });

    res.status(200).json(resultUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 내 정보 로드
router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const me = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Post,
            include: [
              {
                model: PostImage,
              },
              {
                model: Comment,
                include: [
                  {
                    model: User,
                    attributes: ["id"],
                  },
                ],
              },
              {
                model: User,
                as: "PostProdders",
                attributes: ["id"],
              },
            ],
          },
          {
            model: User,
            as: "Tracings",
            attributes: ["id", "class", "username", "role", "avatar", "rank"],
          },
          {
            model: User,
            as: "Tracers",
            attributes: ["id", "class", "username", "role", "avatar", "rank"],
          },
        ],
      });

      if (me.rankPoint >= 1000 && me.rank > 5) {
        me.update({
          rank: 5,
        });
      } else if (me.rankPoint >= 5000 && me.rank > 4) {
        me.update({
          rank: 4,
        });
      } else if (me.rankPoint >= 10000 && me.rank > 3) {
        me.update({
          rank: 3,
        });
      } else if (me.rankPoint >= 100000 && me.rank > 2) {
        me.update({
          rank: 2,
        });
      } else if (me.rankPoint >= 1000000 && me.rank > 1) {
        me.update({
          rank: 1,
        });
      }

      res.status(200).json(me);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:userId/info/public", isLoggedIn, async (req, res, next) => {
  try {
    if (parseInt(req.params.userId, 10) !== req.user.id) {
      return res.status(403).send("다른 사용자의 정보를 수정할 수 없습니다.");
    }

    const me = await User.findOne({
      where: { id: req.params.userId },
    });
    if (me.username !== req.body.username) {
      const existedUsername = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (existedUsername) {
        return res.status(403).send("이미 존재하는 사용자명입니다.");
      }
    }

    await User.update(
      {
        class: req.body.class,
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
      class: req.body.class,
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
      attributes: ["id", "class", "username", "role", "rank", "avatar"],
    });
    if (!targetUser) {
      res.status(403).send("Trace failed: 존재하지 않는 사용자입니다.");
    }
    await User.increment(
      {
        rankPoint: 100,
      },
      {
        where: { id: req.params.userId },
      }
    );
    const me = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "class", "username", "role", "rank", "avatar"],
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
    });
    if (!targetUser) {
      res.status(403).send("Untrace failed: 존재하지 않는 사용자입니다.");
    }
    await User.decrement(
      {
        rankPoint: 100,
      },
      {
        where: { id: req.params.userId },
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

// 사용자 신고 접수
router.post("/:userId/report", isLoggedIn, async (req, res, next) => {
  try {
    const targetUser = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!targetUser) {
      return res.status(403).send("Report failed: 존재하지 않는 사용자입니다.");
    }
    const alreadyReported = await UserReport.findOne({
      where: {
        UserId: targetUser.id,
        reporterId: req.user.id,
      },
    });
    if (alreadyReported) {
      return res.status(403).send("이미 신고한 사용자입니다.");
    }

    await User.increment(
      {
        reported: 1,
      },
      {
        where: { id: req.params.userId },
      }
    );

    const reporter = await User.findOne({
      where: { id: req.user.id },
    });
    await UserReport.create({
      UserId: req.params.userId,
      targetPostId: req.body.postId,
      reporterId: req.user.id,
      reporterEmail: reporter.email,
      reporterUsername: reporter.username,
      content: req.body.reportContent,
    });

    res.status(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Password 지원
router.post("/support/password", isNotLoggedIn, async (req, res, next) => {
  try {
    const targetUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (!targetUser) {
      return res.status(403).send("존재하지 않는 계정입니다.");
    }
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_APP_PASSWORD,
      },
    });

    const randomCode = Math.random().toString(36).slice(2);
    const mailOptions = {
      to: req.body.email,
      subject: "BlooBolt Support: 임시 비밀번호를 전송해드립니다.",
      html: `
        임시 비밀번호를 전송해드립니다. 로그인 후 즉시 비밀번호를 변경하세요.<br/>
        <h4>${randomCode}</h4>
        <br/><br/>
        <span>from. BlooBolt Support</span>
        `,
    };

    const hashedPassword = await bcrypt.hash(randomCode, 10);
    await User.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          email: req.body.email,
        },
      }
    );
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: `${req.body.email}로 임시 비밀번호를 전송했습니다.`,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

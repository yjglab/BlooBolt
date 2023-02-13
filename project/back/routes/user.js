const express = require("express");
const bcrypt = require("bcrypt");

const { User, Userboard, Post } = require("../models");
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const passport = require("passport");

const router = express.Router();

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
    });

    await user.createUserboard({
      UserId: user.id,
      rank: 0,
      rankpoint: 0,
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
            model: Userboard,
          },
          {
            model: Post,
            attributes: ["id"],
          },
        ],
      });
      return res.status(200).json(resultUser);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});
module.exports = router;

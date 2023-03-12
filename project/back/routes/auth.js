const express = require("express");

const { User, Post, Comment, UserReport, PostImage } = require("../models");
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const passport = require("passport");

const router = express.Router();

router.get("/kakao", isNotLoggedIn, passport.authenticate("kakao")); // get /auth/kakao 로 접근하면 카카오 로그인 창으로 연결된다.
router.get("/kakao/callback", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("kakao", (error, user, info) => {
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
        where: { email: user.email },
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

module.exports = router;

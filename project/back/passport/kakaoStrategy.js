const KakaoStrategy = require("passport-kakao").Strategy;
const dotenv = require("dotenv");
const { User } = require("../models");
dotenv.config();

module.exports = (passport) => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existedUser = await User.findOne({
            where: {
              social: "kakao",
              socialId: profile.id,
            },
          });
          if (existedUser) {
            done(null, existedUser);
          } else {
            const newSocialUser = await User.create({
              usercode: "social",
              email: profile._json.kakao_account.email,
              username: `kakao_${Math.random().toString(36).slice(6)}`,
              password: "social",
              class: "social",
              avatar:
                process.env.NODE_ENV === "production"
                  ? "https://blooboltbucket.s3.ap-northeast-2.amazonaws.com/thumb/base_avatar.png"
                  : "base_avatar.png",
              social: "kakao",
              socialId: profile.id,
            });
            done(null, newSocialUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

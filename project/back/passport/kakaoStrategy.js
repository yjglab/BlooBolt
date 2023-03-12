const KakaoStrategy = require("passport-kakao").Strategy;

const { User } = require("../models");

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
              email: profile._json.kakao_account_email,
              social: "kakao",
            },
          });
          if (existedUser) {
            done(null, existedUser);
          } else {
            const newSocialUser = await User.create({
              usercode: "social",
              email: profile._json.kakao_account_email,
              username: `kakao_${Math.random().toString(36).slice(6)}`,
              password: "social",
              class: "public",
              avatar:
                process.env.NODE_ENV === "production"
                  ? "https://blooboltbucket.s3.ap-northeast-2.amazonaws.com/thumb/base_avatar.png"
                  : "base_avatar.png",
              rank: 0,
              rankPoint: 0,

              role: "None",
              country: "None",
              website: "None",
              about: "",

              realname: "",
              address: "",

              reported: 0,
              banned: false,
              social: "kakao",
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

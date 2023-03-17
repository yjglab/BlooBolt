const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");

const { User } = require("../models");
dotenv.config();

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/auth/google/callback",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existedUser = await User.findOne({
            where: { social: "google", socialId: profile.id },
          });
          console.log(existedUser);
          if (existedUser) {
            done(null, existedUser);
          } else {
            const newSocialUser = await User.create({
              usercode: "social",
              email: profile.emails[0].value,
              username: `google_${Math.random().toString(36).slice(6)}`,
              password: "social",
              class: "social",
              avatar:
                process.env.NODE_ENV === "production"
                  ? "https://blooboltbucket.s3.ap-northeast-2.amazonaws.com/thumb/base_avatar.png"
                  : "base_avatar.png",
              social: "google",
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

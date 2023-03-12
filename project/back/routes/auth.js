const express = require("express");
const env = process.env.NODE_ENV || "development";
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const passport = require("passport");

const router = express.Router();

router.get("/kakao", passport.authenticate("kakao"));
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/login",
  }),
  async (req, res) => {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === "production") {
      res.redirect("https://bloobolt.com/square");
    } else {
      res.redirect("http://localhost:4040/square");
    }
  }
);

module.exports = router;

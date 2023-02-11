const express = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../models");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
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
    await User.create({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      status: false,
    });

    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

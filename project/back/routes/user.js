const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

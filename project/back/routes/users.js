const express = require("express");
const { User } = require("../models");
const router = express.Router();

router.get("/status", async (req, res, next) => {
  try {
    const activeUsers = await User.findAll({
      attributes: ["id"],
      where: {
        status: true,
      },
    });

    res.status(201).json(activeUsers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

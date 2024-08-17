const router = require("express").Router();
const User = require("../models/user.model");

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

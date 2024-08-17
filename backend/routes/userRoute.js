const router = require("express").Router();
const User = require("../models/user.model");
router.get("/profile", function (req, res) {
  res.send(req.user);
});

module.exports = router;

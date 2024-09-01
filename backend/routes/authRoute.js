const router = require("express").Router();

const User = require("../models/user.model");
const passport = require("passport");
router.get("/login", async (req, res, next) => {});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.sendStatus(400);
      return;
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.send(user);
    });
  })(req, res, next);
});

router.get("/register", async (req, res) => {
  res.send("Register Get");
});

router.post("/register", async (req, res, next) => {
  const { email, password, name } = req.body;
  const user = new User({
    email,
    password,
    name,
  });
  try {
    const doesExist = await User.findOne({ email: email });
    if (doesExist) {
      res.sendStatus(400);
      return;
    }
    const result = await user.save();
    res.send(result);
  } catch (err) {
    next(err);
  }
});
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.send({ message: "Logout" });
  });
});

module.exports = router;

const User = require("../models/user.model");
const passport = require("passport");

class AuthController {
  async loginGet(req, res, next) {}

  async loginPost(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.send(info);
        return;
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.send(user);
      });
    })(req, res, next);
  }

  async registerGet(req, res) {
    res.send("Register Get");
  }

  async registerPost(req, res, next) {
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
  }

  async logoutPost(req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      return res.send({ message: "Logout" });
    });
  }
}

module.exports = new AuthController();

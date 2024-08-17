function ensureLogin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
}
function ensureAdmin(req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }
  res.sendStatus(403);
}

module.exports = { ensureLogin, ensureAdmin };

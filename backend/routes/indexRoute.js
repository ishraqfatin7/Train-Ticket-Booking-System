const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Train Ticket Booking System is Online.");
});

module.exports = router;

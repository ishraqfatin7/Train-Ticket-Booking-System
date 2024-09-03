const express = require("express");
const router = express.Router();
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const adminRoute = require("./adminRoute");
const stationRoute = require("./stationRoute");
const trainRoute = require("./trainRoute");
const walletRoute = require("./walletRoute");
const purchaseRoute = require("./purchaseRoute");
const shortPathRoute = require("./shortestPathRoute");
const {
  ensureLogin,
  ensureAdmin,
} = require("../middlewares/ensureAdmin.middleware");

router.get("/", (req, res) => {
  res.send("Welcome to the Railway Booking System API");
});

router.use("/api/auth", authRoute);
router.use("/api/user", ensureLogin, userRoute);
router.use("/api/admin", ensureLogin, ensureAdmin, adminRoute);
router.use("/api/stations", stationRoute);
router.use("/api/trains", trainRoute);
router.use("/api/wallets", walletRoute);
router.use("/api/purchase", purchaseRoute);
router.use("/api/routes", shortPathRoute);

module.exports = router;

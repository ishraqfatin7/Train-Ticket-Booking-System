const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletController");

router.get(
  "/:wallet_id",
  walletController.getWalletBalance.bind(walletController)
);
router.put(
  "/:wallet_id",
  walletController.addWalletBalance.bind(walletController)
);

module.exports = router;

const router = require("express").Router();
const User = require("../models/user.model");

// Get Wallet Balance
router.get("/:wallet_id", async (req, res) => {
  const walletId = parseInt(req.params.wallet_id);
  try {
    const user = await User.findOne({ wallet_id: walletId });
    if (!user) {
      return res
        .status(404)
        .json({ message: `wallet with id: ${walletId} was not found` });
    }
    res.status(200).json({
      wallet_id: user.wallet_id,
      wallet_balance: user.balance,
      wallet_user: {
        user_id: user._id,
        user_name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add Wallet Balance
router.put("/:wallet_id", async (req, res) => {
  const walletId = parseInt(req.params.wallet_id);
  const rechargeAmount = parseInt(req.body.recharge);

  if (rechargeAmount < 100 || rechargeAmount > 10000) {
    return res
      .status(400)
      .json({ message: `invalid amount: ${rechargeAmount}` });
  }

  try {
    const user = await User.findOne({ wallet_id: walletId });
    if (!user) {
      return res
        .status(404)
        .json({ message: `wallet with id: ${walletId} was not found` });
    }

    user.balance += rechargeAmount;
    await user.save();

    res.status(200).json({
      wallet_id: user.wallet_id,
      wallet_balance: user.balance,
      wallet_user: {
        user_id: user._id,
        user_name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

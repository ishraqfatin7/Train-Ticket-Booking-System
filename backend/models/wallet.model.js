const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
    min: 0,
  },
  user_name: {
    type: String,
    required: true,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;

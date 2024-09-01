const mongoose = require("mongoose");
const { roles } = require("../utils/constants");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: [roles.admin, roles.user],
    default: roles.user,
  },
  name: {
    type: String,
    required: true,
  },
  wallet_id: {
    type: Number,
    //required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      if (this.email === process.env.ADMIN_EMAIL.toLowerCase()) {
        this.role = roles.admin;
      }
      if (!this.wallet_id) {
        // Generate a random wallet_id only number between 1 and 1000000
        this.wallet_id = Math.floor(Math.random() * 1000000) + 1;
        console.log(this.wallet_id);
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    if (this.balance < 0) {
      return next(new Error("Insufficient balance"));
    }
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("user", userSchema);
module.exports = User;

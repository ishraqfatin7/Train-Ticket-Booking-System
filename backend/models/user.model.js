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
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
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
      if (!this.user_id) {
        this.user_id = new mongoose.Types.ObjectId().toHexString();
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("user", userSchema);
module.exports = User;

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      validate: /^[A-Za-z]+$/,
    },
    lastName: {
      type: String,
      required: true,
      validate: /^[A-Za-z]+$/,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: /^[A-Za-z][A-Za-z0-9_]*$/,
    },
    role: {
      type: String,
      required: true,
      default: "NORMAL",
    },
    password: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const USER = mongoose.model("user", userSchema);

module.exports = USER;

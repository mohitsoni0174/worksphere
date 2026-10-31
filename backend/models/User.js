const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
    }, // Role can be either "member" or "admin"
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);

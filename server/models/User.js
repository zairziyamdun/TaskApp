const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["user", "manager", "admin"], default: "user" },
  avatarUrl:{ type: String, default: "" },
  isBlocked: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

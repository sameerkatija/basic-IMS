const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: {
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
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 11);
  next();
});

userSchema.methods.comparePassword = async function (pass) {
  const auth = await bcrypt.compare(pass, this.password);
  return auth;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

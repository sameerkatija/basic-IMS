const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();

    res.redirect("/auth/signin");
  } catch (e) {
    return res.redirect("/auth/register");
  }
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).redirect("/auth/register");
    const auth = user.comparePassword(password);
    if (!auth) return res.status(401).redirect("/auth/signin");
    res.cookie("user", user.email, { signed: true });
    return res.redirect("/ims/inventory");
  } catch (e) {
    return res.redirect("/auth/signin");
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("/");
});

module.exports = router;

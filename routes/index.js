const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const imsRoutes = require("./ims");
const User = require("../models/user");
const Product = require("../models/product");
router.get("/", async (req, res) => {
  const user = await User.findOne({ email: req.signedCookies.user });
  const products = await Product.find({});

  res.render("index", { user, productCount: products.length });
});

router.use("/ims", imsRoutes);

router.use("/auth", authRouter);

module.exports = router;

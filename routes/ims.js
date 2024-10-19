const express = require("express");
const authMiddleWare = require("../utils/authMiddleWare");
const Product = require("../models/product");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.use(authMiddleWare);

router.get("/new", (req, res) => {
  res.render("newProduct", { user: req.user });
  // res.send("something");
});

router.get("/inventory", async (req, res) => {
  const { search, category, date, price } = req.query;
  const products = await Product.find({});
  if (search && category) {
    const filteredProd = products.filter((product) => {
      return product.category.toLowerCase().includes(search.toLowerCase());
    });
    return res.render("ims", { user: req.user, products: filteredProd });
  }
  if (search && price) {
    const filteredProd = products.filter((product) => {
      return product.price >= parseInt(search);
    });
    return res.render("ims", { user: req.user, products: filteredProd });
  }
  if (search && date) {
    const userParsedDate = new Date(search);
    const filteredProd = products.filter((product) => {
      const productDate = new Date(product.addedOn);

      return productDate < userParsedDate;
    });
    return res.render("ims", { user: req.user, products: filteredProd });
  }
  return res.render("ims", { user: req.user, products });
});

router.post("/inventory", async (req, res) => {
  const { name, price, quantity, category } = req.body;
  try {
    const product = new Product({ name, price, quantity, category });
    await product.save();
    res.redirect("/ims/inventory");
  } catch (err) {
    res.redirect("/ims/new");
  }
});

router.get("/lowstock", async (req, res) => {
  const products = await Product.find({});

  res.render("lowstock", {
    user: req.user,
    products: products.filter((product) => product.quantity < 10),
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.redirect("/ims/inventory");
  }
  const product = await Product.findById(id);
  res.render("updateProduct", { user: req.user, product });
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      res.redirect("/ims/inventory");
    }
    await Product.findByIdAndUpdate(id, req.body);
    res.redirect("/ims/inventory");
  } catch (err) {
    res.redirect("/ims/inventory");
  }
});

module.exports = router;

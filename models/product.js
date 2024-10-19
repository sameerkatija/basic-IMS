const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  addedOn: {
    type: Date,
    default: Date.now, // Sets the default to the current date and time
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

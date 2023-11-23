const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  light: {
    type: Number,
    required: true,
  },
  water: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Products", productSchema, "Products");

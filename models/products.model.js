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
  secondary_category : {
    type: String,
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
  pierres: {
    type: [String],
    default: [],
  },
  idPrixStripe: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Produits", productSchema, "Produits");

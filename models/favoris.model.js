const mongoose = require("mongoose");

const favorisSchema = mongoose.Schema({
  idClient: {
    type: String,
    required: true,
  },
  coverArticle: {
    type: String,
    required: true,
  },
  prixArticle: {
    type: Number,
    required: true,
  },
  nomArticle: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Favoris", favorisSchema, "Favoris");

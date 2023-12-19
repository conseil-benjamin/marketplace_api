const mongoose = require("mongoose");

const adresseSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  nomPersonne: {
    type: String,
    required: true,
  },
  prenomPersonne: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  codePostal: {
    type: String,
    required: true,
  },
  ville: {
    type: String,
    required: true,
  },
  complementAdresse: {
    type: String,
    required: false,
    default: "",
  },
  pays: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Adresses", adresseSchema, "Adresses");

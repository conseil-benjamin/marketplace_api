const mongoose = require("mongoose");

const commandeSchema = mongoose.Schema({
  idCommande: {
    type: String,
    required: true,
  },
  idClient: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  contenuCommande: [
    {
      produit: {
        type: String,
        required: true,
      },
      prix: {
        type: Number,
        required: true,
      },
    },
  ],
  prixTotal: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Commandes", commandeSchema, "Commandes");

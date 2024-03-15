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
  nbArticles: {
    type: Number,
    required: true,
  },
  adresseLivraison: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Adresses",
    required: true,
  },
  typeLivraison: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  numeroSuivieMondialRelay: {
    type: String,
    required: false,
  },
  fraisLivraison: {
    type: Number,
    required: true,
  },
  codePostalCommande: {
    type: String,
    required: true,
  },
  numeroSuivieChronopost: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Commandes", commandeSchema, "Commandes");

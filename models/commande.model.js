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
      cover:{
        type: String,
        required: true,
      },
      price:{
        type: Number,
        required: true,
      },
      amount:{
        type: Number,
        required: true,
      },
      name:{
        type: String,
        required: true,
      },
      idProduct:{
        type: String,
        required: true,
      }
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

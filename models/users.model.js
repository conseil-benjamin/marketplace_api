const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  adresses: {
    type: [String],
    required: true,
  },
  adresseEmail: {
    type: String,
    required: true,
  },
  mdp: {
    type: String,
    required: true,
  },
  numeroTel: {
    type: String,
    required: true,
  },
  statutClient: {
    type: String,
    required: true,
  },
  historiqueCommandes: {
    type: [
      {
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
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("Users", clientSchema, "Users");

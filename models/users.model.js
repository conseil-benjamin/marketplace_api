const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  adresseEmail: {
    type: String,
    required: true,
    unique: true,
  },
  mdp: {
    type: String,
    required: true,
  },
  numeroTel: {
    type: String,
    required: true,
  },
  civilite: {
    type: String,
    required: true,
  },
  tokenResetMdp: {
    type: String,
    required: false,
  },
  validiteTokenResetMdp:{
    type: Date,
    required: false,
  },
  tokenStripe: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Users", clientSchema, "Users");

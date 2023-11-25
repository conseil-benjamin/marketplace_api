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
  adresses: {
    type: [String],
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
});

module.exports = mongoose.model("Users", clientSchema, "Users");

const mongoose = require("mongoose");

const panierSchema = mongoose.Schema({
    numeroPanier: {
        type: String,
        required: true,
    },
    numeroClient: {
        type: String,
        required: true,
    },
    prixArticle: {
        type: Number,
        required: true,
    },
    prixTotal: {
        type: String,
        required: true,
    },
    contenuPanier: [
        {
            cover:{
                type: String,
                required: true,
            },
            prix:{
                type: Number,
                required: true,
            },
            nombre:{
                type: Number,
                required: true,
            },
            nom:{
                type: String,
                required: true,
            },
            id_product:{
                type: String,
                required: true,
            }
        }
    ]
});

module.exports = mongoose.model("Panier", panierSchema, "Panier");

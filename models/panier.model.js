const mongoose = require("mongoose");
const {Double} = require("mongodb");

const panierSchema = mongoose.Schema({
    numeroPanier: {
        type: String,
        required: true,
    },
    numeroClient: {
        type: String,
        required: true,
    },
    contenuPanier: [
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
        }
    ],
    total:{
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Panier", panierSchema, "Panier");
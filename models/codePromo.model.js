const mongoose = require("mongoose");

const codePromoSchema = mongoose.Schema({
    codePromo: {
        type: String,
        required: true,
        unique: true,
    },
    dateValidite: {
        type: Date,
        required: true,
    },
    reduction: {
        type: Number,
        required: true,
    },
    reductionValeurEntier: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("CodePromo", codePromoSchema, "CodePromo");

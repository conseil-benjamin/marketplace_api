const Paniers = require("../models/panier.model");
const Favoris = require("../models/favoris.model");

module.exports.getPanier = async (req, res) => {
    try {
        const numClient = req.userId;
        const panier = await Paniers.findOne({ numeroClient: numClient });

        if (!panier) {
            res.status(404).json({ message: "Panier non trouvé" });
            return;
        }
        res.status(200).json({ contenuPanier: panier.contenuPanier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports.insertPanier = async (req, res) => {
    try {
        const produit = req.body.panierInfos;
        console.log(produit);
        const id = req.userId;
        const timestamp = new Date().getTime();
        const uniqueId = `${timestamp}`;
        let panier = await Paniers.findOne({ numeroClient: id });
        if (!panier) {
            panier = await Paniers.create({ numeroPanier: uniqueId ,numeroClient: id, contenuPanier: produit });
        } else {
            panier.contenuPanier.push(produit);
        }

        const result = await panier.save();

        res.json({ success: true, panier: result });
    } catch (error) {
        console.error("Erreur lors de l'insertion des données:", error);
        res.status(500).json({ success: false, error: "Erreur serveur" });
    }
};

module.exports.deleteProductFromPanier = async (req, res) => {
    try {
        const idClient = req.userId;
        const index = req.body.index;
        console.log(index);
        const panier = await Paniers.findOne({ numeroClient: idClient });
        console.log(panier.contenuPanier);

        if (!panier) {
            res.status(404).json("Aucun panier appartenant à ce compte.");
            return;
        }
        panier.contenuPanier.splice(index,1);
        const result = await panier.save();
        const panierAjour = await Paniers.findOne({ numeroClient: idClient });

        console.log(panierAjour.contenuPanier);
        res.status(200).json({ contenuPanier: panierAjour.contenuPanier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

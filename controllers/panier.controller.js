const Paniers = require("../models/panier.model");

module.exports.getPanier = async (req, res) => {
    try {
        console.log(req.userId);
        const numClient = req.userId;
        const panier = await Paniers.findOne({ numeroClient: numClient });

        if (!panier) {
            res.status(404).json({ message: "Panier non trouvé" });
            return;
        }
        res.status(200).json(panier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
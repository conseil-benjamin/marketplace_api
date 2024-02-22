const CodePromos = require("../models/codePromo.model");

module.exports.getCodePromo = async (req, res) => {
    try {
        const codePromo = req.params.codePromo;
        console.log(codePromo);
        const result = await CodePromos.findOne({ codePromo: codePromo });

        if (!result) {
            res.status(400).json({ message: "Aucun code promo trouvée" });
            return;
        }

        if (result.dateValidite < Date.now()){
            res.status(400).json({ message: "Code expiré" });
            return;
        }
        console.log(result.reduction);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
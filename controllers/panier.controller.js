const Paniers = require("../models/panier.model");

module.exports.getPanier = async (req, res) => {
    try {
        const numClient = req.userId;
        const panier = await Paniers.findOne({ numeroClient: numClient });

        if (!panier) {
            res.status(404).json({ message: "Panier non trouvé" });
            return;
        }
        res.status(200).json({total: panier.total, contenuPanier: panier.contenuPanier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports.insertPanier = async (req, res) => {
    try {
        const produit = req.body.panierInfos;
        const id = req.userId;
        const timestamp = new Date().getTime();
        const uniqueId = `${timestamp}`;
        let newAmount = 1;
        let panier = await Paniers.findOne({ numeroClient: id });
        if (!panier) {
            panier = await Paniers.create({ numeroPanier: uniqueId ,numeroClient: id, contenuPanier: produit, total: produit.price });
        }  else if (panier.contenuPanier.some(item => item.idProduct === produit.idProduct)) {
            const productIndex = panier.contenuPanier.findIndex(item => item.idProduct === produit.idProduct);
            const amount = panier.contenuPanier[productIndex].amount;
            newAmount = amount + 1;
            panier.contenuPanier[productIndex].amount = newAmount;
        } else{
            panier.contenuPanier.push(produit);
        }

        const totalPanierClient = calculTotal(panier);
        panier.total = totalPanierClient;
        const result = await panier.save();
        res.json({ newAmount: newAmount, contenuPanier: result.contenuPanier});
    } catch (error) {
        console.error("Erreur lors de l'insertion des données:", error);
        res.status(500).json({ success: false, error: "Erreur serveur" });
    }
};

module.exports.deleteProductFromPanier = async (req, res) => {
    try {
        const idClient = req.userId;
        const index = req.body.index;
        let panier = await Paniers.findOne({ numeroClient: idClient });

        if (!panier) {
            res.status(404).json("Aucun panier appartenant à ce compte.");
            return;
        }
        panier.contenuPanier.splice(index,1);

        const totalPanierClient = calculTotal(panier);
        panier.total = totalPanierClient;
        panier = await panier.save();
        res.status(200).json({ contenuPanier: panier.contenuPanier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports.deleteProductsFromPanier = async (req, res) => {
    try {
        const idClient = req.userId;
        let panier = await Paniers.findOne({ numeroClient: idClient });

        if (!panier) {
            res.status(404).json("Aucun panier appartenant à ce compte.");
            return;
        }
        panier.contenuPanier = [];

        const totalPanierClient = calculTotal(panier);
        panier.total = totalPanierClient;
        panier = await panier.save();
        res.status(200).json({ contenuPanier: panier.contenuPanier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports.updatePanier = async (req, res) => {
    try {
        const idClient = req.userId;
        const newAmount = req.body.panierInfos.amount;
        const idProduct = req.body.panierInfos.idProduct;
        let panier = await Paniers.findOne({ numeroClient: idClient });

        if (!panier) {
            res.status(404).json("Aucun panier appartenant à ce compte.");
            return;
        }
        // mise à jour du nombre pour un produit
        const productIndex = panier.contenuPanier.findIndex(item => item.idProduct === idProduct);
        panier.contenuPanier[productIndex].amount = newAmount;

        const totalPanierClient = calculTotal(panier);
        panier.total = totalPanierClient;
        panier = await panier.save();
        res.status(200).json({ contenuPanier: panier.contenuPanier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports.insertProductsFromLocaleStorage = async (req, res) => {
    try {
        console.log("dzdzqdzqdzqdqdqdzqdqzdqzdqzdqzdqzdqzdzqdzqdqzdzqdzqdqzdq");
        const products = req.body.panierUpdated;
        console.log("---------------------------" + products);
        const id = req.userId;
        let newAmount = 1;
        let panier = await Paniers.findOne({ numeroClient: id });
        if (!panier) {
            const timestamp = new Date().getTime();
            const uniqueId = `${timestamp}`;
            panier = await Paniers.create({ numeroPanier: uniqueId ,numeroClient: id, contenuPanier: products });
        }
        for (let product of products){
            console.log("products : " + product)
            if (panier.contenuPanier.some(item => item.idProduct === product.idProduct)) {
                console.log("----------------------------------Produit déjà dans le panier---------------------------------");
                const productIndex = panier.contenuPanier.findIndex(item => item.idProduct === product.idProduct);
                const amount = panier.contenuPanier[productIndex].amount;
                newAmount = amount + 1;
                panier.contenuPanier[productIndex].amount = newAmount;
            } else{
                panier.contenuPanier.push(product);
            }
        }
        const totalPanierClient = calculTotal(panier);
        panier.total = totalPanierClient;
        const result = await panier.save();
        res.json({ newAmount: totalPanierClient, contenuPanier: result.contenuPanier});
    } catch (error) {
        console.error("Erreur lors de l'insertion des données:", error);
        res.status(500).json({ success: false, error: "Erreur serveur" });
    }
};

function calculTotal(panier){
    let totalPanierClient = 0;
    for (let product of panier.contenuPanier){
        totalPanierClient += product.amount * product.price;
    }
    return totalPanierClient;
}


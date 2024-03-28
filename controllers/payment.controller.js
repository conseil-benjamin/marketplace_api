const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const UsersModel = require("../models/users.model");

module.exports.createCheckoutSession = async (req, res) => {
    const lineItems = req.body;
    console.log(lineItems)
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems.map(item => ({
            price: item.idPrixStripe,
            quantity: item.amount,
        })),
        mode: 'payment',
        success_url: process.env.URL_SITE + `/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: process.env.URL_SITE + '/checkout/payment',
        automatic_tax: {enabled: true},
    });

    /**
     * Ajout du token Stripe dans la table de l'user
     */
    const id = req.userId;
    const user = await UsersModel.findOne({ id: id });
    if (!user) {
        console.log(`User with id ${id} not found`);
        return res.status(404).json({ message: 'User not found' });
    }
    console.log("dzqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"+ session.id)
    user.tokenStripe = session.id;
    const result = await user.save();
    if (!result) {
        console.log(`Failed to update user with id ${id}`);
        return res.status(500).json({ message: 'Failed to update user' });
    }

    /**
     * TODO : Ajouter un token Stripe dans la table de l'user
     * TODO : Ensuite vérifier quand je me connecte à la page de succès si le paramètre dans l'url correspond à celui stocké en bdd
     * TODO : si oui je crée la commande et ensuite je supprime le token dans la table de l'user
     * TODO : si non je met un message d'erreur et je redirige quelque part
     * TODO : vider en BDD le panier du client
     */
    res.status(200).json({ url: session.url });
}

module.exports.updateUserStripeToken = async (req, res) => {
    try {
        const id = req.userId;
        const result = await UsersModel.findOne({ id: id });

        if (!result) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
            return;
        }
        result.tokenStripe = "";
        const userAfterUpdate = result.save();

        console.log(userAfterUpdate);
        res.status(200).json();
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

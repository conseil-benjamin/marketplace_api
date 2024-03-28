const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    console.log(session.url)
    /**
     * TODO : Ajouter un token Stripe dans la table de l'user
     * TODO : Ensuite vérifier quand je me connecte à la page de succès si le paramètre dans l'url correspond à celui stocké en bdd
     * TODO : si oui je crée la commande et ensuite je supprime le token dans la table de l'user
     * TODO : si non je met un message d'erreur et je redirige quelque part
     */
    res.status(200).json({ url: session.url });
}
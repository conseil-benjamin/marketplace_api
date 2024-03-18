module.exports.getRelayPoints = async (req, res) => {
    try {
        const codePostal = req.params.codePostal;
        console.log(codePostal)
        // Construction de l'URL de l'API avec le code postal fourni
        const apiUrl = `https://api.mondialrelay.com/Web_Services.asmx/WSI3_PointRelais_Recherche?Enseigne=BDTEST13&Pays=FR&CP=${codePostal}&Security=PrivateK`;
        console.log(apiUrl)

        // Appel de l'API avec fetch
        const response = await fetch(apiUrl);

        // Vérification de la réponse HTTP
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        // Conversion de la réponse en JSON
        const data = await response.json();
        console.log(data);

        // Vérification du code de statut de la réponse
        if (data.STAT !== '0') {
            throw new Error(`Erreur de l'API: ${data.STAT}`);
        }

        // Récupération des points relais
        const pointsRelais = data['Points Relais'];

        res.status(200).json(pointsRelais);
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des points relais: ${error.message}`);
    }
};
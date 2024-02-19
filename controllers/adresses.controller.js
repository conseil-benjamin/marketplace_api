const Adresses = require("../models/adresses.model");
const Paniers = require("../models/panier.model");

module.exports.getAdresses = async (req, res) => {
  try {
    const idClient = req.userId;
    const adresses = await Adresses.find({ userId: idClient });

    if (!adresses) {
      res.status(404).json({ message: "Adresses non trouvée" });
      return;
    }

    res.status(200).json(adresses);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports.getAdresseByObjectId = async (req, res) => {
  try {
    const adresse = await Adresses.findById({ _id: req.params.idAdresse});

    if (!adresses) {
      res.status(404).json({ message: "Adresses non trouvée" });
      return;
    }

    res.status(200).json(adresse);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports.insertAdresse = async (req, res) => {
  try {
    const idClient = req.userId;
    const adresse = req.body;
    console.log(adresse)
    let result = await Adresses.create({ userId: idClient ,nomPersonne: adresse.nomPersonne, prenomPersonne: adresse.prenomPersonne, adresse: adresse.adresse, codePostal: adresse.codePostal, ville: adresse.ville, complementAdresse: adresse.complementAdresse, pays: adresse.pays, numTel: adresse.numTel});

    let insertedAdresse = await Adresses.findById(result._id);
    console.log(insertedAdresse);
    if (insertedAdresse) {
      res.status(200);
      console.log("L'adresse a été insérée avec succès.");
    } else {
      res.status(404);
      console.log("L'adresse n'a pas été insérée.");
    }

  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};


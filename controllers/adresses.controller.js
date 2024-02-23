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
    const adresseId = req.params.adresseId;
    console.log(adresseId)
    const adresse = await Adresses.findById({ _id: adresseId});

    if (!adresse) {
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
      res.status(200).json();
      console.log("L'adresse a été insérée avec succès.");
    } else {
      res.status(404).json();
      console.log("L'adresse n'a pas été insérée.");
    }

  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports.deleteAdresse = async (req, res) => {
  try {
    const idAdresse = req.body.idAdresse;
    const idClient = req.userId;
    console.log(idAdresse)
    const result = await Adresses.deleteOne({ _id: idAdresse });
    const deleteAdress = await Adresses.findById({_id: idAdresse});
    if (!deleteAdress) {
      console.log("L'adresse a été supprimé avec succès.");
    } else {
      res.status(404).json();
      console.log("L'adresse n'a pas été supprimé.");
    }

    const adressesAfterDelete = await Adresses.find({ userId: idClient });
    res.status(200).json(adressesAfterDelete);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports.updateAdresse = async (req, res) => {
  try {
    const adresse = req.body;
    const idClient = req.userId;
    console.log(idAdresse)
    const result = await Adresses.deleteOne({ _id: idAdresse });
    const deleteAdress = await Adresses.findById({_id: idAdresse});
    if (!deleteAdress) {
      console.log("L'adresse a été supprimé avec succès.");
    } else {
      res.status(404).json();
      console.log("L'adresse n'a pas été supprimé.");
    }

    const adressesAfterDelete = await Adresses.find({ userId: idClient });
    res.status(200).json(adressesAfterDelete);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

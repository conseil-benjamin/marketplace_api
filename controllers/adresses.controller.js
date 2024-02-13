const Adresses = require("../models/adresses.model");

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


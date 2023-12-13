const Adresses = require("../models/adresses.model");

module.exports.getAdresses = async (req, res) => {
  try {
    const adresses = await Adresses.find({});
    res.status(200).json(adresses);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

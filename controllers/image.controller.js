const ProductModel = require("../models/products.model");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        secure: true
    }
)

module.exports.uploadImage = async (req, res) => {
    try {
        const image = req.file.path;
        const urlImage = cloudinary.uploader.upload(image);
        /**
         * TODO : Upload l'image sur cloudinary et ensuite changer l'url d'image pour le produit possédant l'id en question
         */

        res.status(200).json(urlImage);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};
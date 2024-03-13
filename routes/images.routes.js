const express = require("express");
const {
    uploadImage,
} = require("../controllers/image.controller");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post("/upload", upload.single('image'), uploadImage);

module.exports = router;
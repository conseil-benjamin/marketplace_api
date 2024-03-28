const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const {getUser} = require("./controllers/users.controller");
const PORT = 5000;

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/products", require("./routes/products.routes"));
app.use("/api/v1/users", require("./routes/users.routes"));
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/commandes", require("./routes/commandes.routes"));
app.use("/api/v1/adresses", require("./routes/adresses.routes"));
app.use("/api/v1/favoris", require("./routes/favoris.routes"));
app.use("/api/v1/panier", require("./routes/panier.routes"));
app.use("/api/v1/mail", require("./routes/email.routes"));
app.use("/api/v1/codePromo", require("./routes/codePromo.routes"));
app.use("/api/v1/images", require("./routes/images.routes"));
app.use("/api/v1/mondialRelay", require("./routes/mondialRelay.routes"));
app.use("/api/v1/payment", require("./routes/payment.routes"));


// lancer le serveur
app.listen(PORT, () => console.log("Le serveur à démarrer au port " + PORT));

/*
   * Permet de garder le serveur en ligne 24H/24
 */
    setInterval(() => {
        fetch('https://anneso-naturelle-api.onrender.com/api/v1/products/bracelets')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }, 1 * 60 * 1000);

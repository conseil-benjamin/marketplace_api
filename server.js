const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
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
// lancer le serveur
app.listen(PORT, () => console.log("Le serveur à démarrer au port " + PORT));
setInterval(() => {
    console.log(Date.now());
}, 2 * 60 * 1000); // 2 minutes
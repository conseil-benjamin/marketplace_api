const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
var cors = require("cors");
const PORT = 5000;

const app = express();
connectDB();

// Middleware qui permet de traiter les données de la request
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/products", require("./routes/products.routes"));
app.use("/api/v1/users", require("./routes/users.routes"));

// lancer le serveur
app.listen(PORT, () => console.log("Le serveur à démarrer au port" + PORT));

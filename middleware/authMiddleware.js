const jwt = require("jsonwebtoken");

const authMiddleware = (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé. Token manquant." });
  }

  try {
    const decoded = jwt.verify(token, process.env.CLE_SECRETE);
    req.userId = decoded.id;
  } catch (error) {
    console.error("Erreur de vérification du token:", error);
    return res
      .status(401)
      .json({ message: "Accès non autorisé. Token invalide." });
  }
};

module.exports = authMiddleware;

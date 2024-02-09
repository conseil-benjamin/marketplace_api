const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé. Token manquant." });
  }

  try {
    const decoded = jwt.verify(token, "123");
    req.userId = decoded.id;
    next();
  } catch (error) {

    console.error("Erreur de vérification du token:", error);
    return res
      .status(401)
      .json({ message: "Accès non autorisé. Token invalide." });
  }
};

module.exports = authMiddleware;

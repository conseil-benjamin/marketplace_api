const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé. Token manquant." });
  }
  console.log(token);

  try {
    console.log(token);
    const decoded = jwt.verify(token, "123");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(token);

    console.error("Erreur de vérification du token:", error);
    return res
      .status(401)
      .json({ message: "Accès non autorisé. Token invalide." });
  }
};

module.exports = authMiddleware;

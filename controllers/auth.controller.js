const UsersModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
  try {
    let userInformations = req.body;
    const email = userInformations.email;
    const password = userInformations.password;

    let user = await UsersModel.findOne({ adresseEmail: email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isSamePassword = await bcrypt.compare(password, user.mdp);
    if (!isSamePassword) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      "123",
      { expiresIn: "7d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

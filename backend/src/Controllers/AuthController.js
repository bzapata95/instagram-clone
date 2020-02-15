const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Models/User");

module.exports = {
  async howIam(req, res) {
    console.log("Fetching data...");
    const user = await User.findByPk(req.userId, {
      attributes: ["id", "username", "name", "avatar_url"]
    });

    req.redis.setex(req.userId, 3600, JSON.stringify(user));

    return res.json(user);
  },

  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const { username, password } = req.body;

    let user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).send({ message: "Usuario incorrecto" });

    const verifyPass = await bcryptjs.compare(password, user.password);
    if (!verifyPass)
      return res.status(400).send({ message: "Verifique sus credenciales" });

    //JWT
    const payload = { id: user.id, username: user.username };
    jwt.sign(
      payload,
      process.env.SIGNATURE_TOKEN,
      { expiresIn: 86400 },
      (error, token) => {
        if (error) throw error;
        return res.json({ token });
      }
    );
  }
};

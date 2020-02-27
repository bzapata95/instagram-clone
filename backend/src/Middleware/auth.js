const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "No autorizado" });

  // Bearer asdjahd8asd8a7d9a8sd
  const parts = authHeader.split(" ");

  if (parts.length !== 2)
    return res.status(401).send({ error: "Token error" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Token malformateado" });

  jwt.verify(token, process.env.SIGNATURE_TOKEN, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token invalido" });

    req.userId = decoded.id;
    return next();
  });
};

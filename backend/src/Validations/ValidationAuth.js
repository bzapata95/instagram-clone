const { check } = require("express-validator");

const ValidationAuth = {
  login: [
    check("username", "Ingrese su usuario")
      .not()
      .isEmpty(),
    check("password", "Ingrese su password")
      .not()
      .isEmpty()
  ]
};

module.exports = ValidationAuth;

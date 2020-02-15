const { check } = require("express-validator");

const ValidationsUser = {
  withPassword: [
    check("name", "Ingrese su nombre completo")
      .not()
      .isEmpty(),
    check("username", "Ingrese su nombre de usuario")
      .not()
      .isEmpty(),
    check("email", "Agreaga un email válido").isEmail(),
    check("password", "El password debe ser mínimo de 6 caracteres").isLength({
      min: 6
    })
  ],
  withoutPassword: [
    check("name", "Ingrese su nombre completo")
      .not()
      .isEmpty(),
    check("email", "Agreaga un email válido").isEmail()
  ],
  password: [
    check("password", "El password debe ser mínimo de 6 caracteres").isLength({
      min: 6
    }),
    check(
      "password_confirm",
      "El password debe ser mínimo de 6 caracteres"
    ).isLength({
      min: 6
    })
  ]
};

module.exports = ValidationsUser;

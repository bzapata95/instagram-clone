const { check } = require("express-validator");

const ValidationComment = {
  comment: [
    check("body", "El comentario no puede estar vacío!")
      .not()
      .isEmpty()
  ]
};

module.exports = ValidationComment;

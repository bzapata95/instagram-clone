const { Op } = require("sequelize");

const User = require("../Models/User");
const Follow = require("../Models/Follow");

module.exports = {
  async store(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user)
      return res.status(404).send({ message: "Usuario no encontrado" });

    if (user.id === req.userId)
      return res.status(400).send({ message: "No puedes seguirte a ti mismo" });

    const follow = await Follow.findOne({
      where: { [Op.and]: [{ user_to: user.id }, { user_from: req.userId }] }
    });

    if (follow) {
      await follow.destroy();
      return res.send();
    } else {
      await Follow.create({
        user_from: req.userId,
        user_to: user.id
      });
      return res.send();
    }
  }
};

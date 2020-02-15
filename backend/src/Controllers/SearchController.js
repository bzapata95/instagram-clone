const { Op } = require("sequelize");
const User = require("../Models/User");

module.exports = {
  async search(req, res) {
    const { term } = req.params;

    const users = await User.findAll({
      attributes: ["id", "username", "name", "avatar_url"],
      where: {
        [Op.or]: [
          { username: { [Op.iLike]: `%${term}%` } },
          { name: { [Op.iLike]: `%${term}%` } }
        ]
      }
    });

    return res.json(users);
  }
};

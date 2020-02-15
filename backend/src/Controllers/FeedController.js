const Sequelize = require("sequelize");
const User = require("../Models/User");
const Photo = require("../Models/Photo");

module.exports = {
  async show(req, res) {
    const { page, pageSize, limit } = req.query;
    if (page * pageSize > limit) {
      return res.json({ newArray: [] });
    }

    const user = await User.findByPk(req.userId, {
      attributes: [],
      include: [
        {
          association: "getFollows",
          attributes: ["user_to"]
        }
      ]
    });

    let array = user.getFollows.map(obj => {
      return obj.user_to;
    });

    array.push(req.userId);

    let photos = await Photo.findAll({
      offset: page * pageSize,
      limit: pageSize,
      attributes: {
        exclude: ["updatedAt"]
      },
      include: [
        {
          association: "uploadedBy",
          attributes: ["username", "avatar_url"]
        },
        {
          association: "getComments",
          attributes: {
            exclude: ["photo_id", "updatedAt"]
          },
          include: {
            association: "postedBy",
            attributes: ["username"]
          },
          limit: 3
        },
        {
          association: "getLikes",
          attributes: ["user_id"]
        }
      ],
      where: { user_id: { [Sequelize.Op.in]: array } },
      order: [["createdAt", "desc"]]
    });

    let newArray = photos.map(photo => {
      let isAutor = false;
      if (photo.user_id === req.userId) isAutor = true;

      let isLiked = false;
      photo.getLikes.map(like => {
        if (like.user_id === req.userId) isLiked = true;
      });

      return { isAutor, isLiked, photo };
    });

    return res.json({ newArray });
  },

  async showFollow(req, res) {
    const user = await User.findByPk(req.userId, {
      attributes: [],
      include: [
        {
          association: "getFollows",
          attributes: ["user_to"]
        }
      ]
    });

    let array = user.getFollows.map(obj => {
      return obj.user_to;
    });

    const follows = await User.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "key", "bio", "phone"]
      },
      where: { id: { [Sequelize.Op.in]: array } }
    });

    return res.json(follows);
  }
};

const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        bio: DataTypes.TEXT,
        phone: DataTypes.STRING,
        key: DataTypes.STRING,
        avatar_url: DataTypes.STRING
      },
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Photo, {
      foreignKey: "user_id",
      as: "photoUploads"
    });
    this.belongsToMany(models.Like, {
      foreignKey: "user_id",
      through: "likes",
      as: "userLike"
    });
    this.hasMany(models.Comment, {
      foreignKey: "user_id",
      as: "getComments"
    });
    this.hasMany(models.Follow, {
      foreignKey: "user_from",
      as: "getFollows"
    });
    this.hasMany(models.Follow, {
      foreignKey: "user_to",
      as: "getFollowers"
    });
  }
}

module.exports = User;

const { Model, DataTypes } = require("sequelize");

class Comment extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        photo_id: DataTypes.INTEGER,
        body: DataTypes.TEXT
      },
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "postedBy"
    });
    this.belongsTo(models.Photo, {
      foreignKey: "photo_id",
      as: "photo"
    });
  }
}

module.exports = Comment;

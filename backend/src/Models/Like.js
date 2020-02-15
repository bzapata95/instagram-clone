const { Model, DataTypes } = require("sequelize");

class Like extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        photo_id: DataTypes.INTEGER
      },
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user"
    });
    this.belongsTo(models.Photo, {
      foreignKey: "photo_id",
      through: "likes",
      as: "photo"
    });
  }
}

module.exports = Like;

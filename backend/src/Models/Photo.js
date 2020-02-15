const { Model, DataTypes } = require("sequelize");

class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        body: DataTypes.TEXT,
        key: DataTypes.STRING,
        photo_url: DataTypes.STRING
      },
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "uploadedBy" });
    this.hasMany(models.Like, {
      foreignKey: "photo_id",
      as: "getLikes"
    });
    this.hasMany(models.Comment, {
      foreignKey: "photo_id",
      as: "getComments"
    });
  }
}

module.exports = Photo;

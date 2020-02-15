const Sequelize = require("sequelize");
const ConfigDB = require("../Config/database");

const User = require("../Models/User");
const Photo = require("../Models/Photo");
const Like = require("../Models/Like");
const Comment = require("../Models/Comment");
const Follow = require("../Models/Follow");

const connection = new Sequelize(ConfigDB);

User.init(connection);
Photo.init(connection);
Like.init(connection);
Comment.init(connection);
Follow.init(connection);

User.associate(connection.models);
Photo.associate(connection.models);
Like.associate(connection.models);
Comment.associate(connection.models);
Follow.associate(connection.models);

module.exports = connection;

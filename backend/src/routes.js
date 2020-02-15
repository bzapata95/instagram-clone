const { Router } = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");

const routes = Router();

const authMiddleware = require("./Middleware/auth");

const redisMiddleware = require("./Middleware/redis"); // Middleware of redis
const cache_howiam = require("./Middleware/redisCache"); // Middleware of redis

const ValidationsUser = require("./Validations/ValidationUser");
const ValidationComment = require("./Validations/ValidationComment");
const ValidationAuth = require("./Validations/ValidationAuth");

const AuthController = require("./Controllers/AuthController");
const UserController = require("./Controllers/UserController");
const PhotoController = require("./Controllers/PhotoController");
const LikeController = require("./Controllers/LikeController");
const CommentController = require("./Controllers/CommentController");
const FollowController = require("./Controllers/FollowController");
const FeedController = require("./Controllers/FeedController");
const SearchController = require("./Controllers/SearchController");

// ** Routes Authenticate ** //

routes.post("/auth", ValidationAuth.login, AuthController.login);
routes.get(
  "/auth",
  authMiddleware,
  redisMiddleware,
  cache_howiam,
  AuthController.howIam
);

// ** Routes Authenticate ** //

// ** Routes user ** //
routes.get("/users/:username", authMiddleware, UserController.show);
routes.post("/users", ValidationsUser.withPassword, UserController.store);
routes.put(
  "/users",
  authMiddleware,
  ValidationsUser.withoutPassword,
  UserController.update
);
routes.put(
  "/avatar",
  authMiddleware,
  multer(multerConfig).single("file"),
  UserController.updateAvatar
);
routes.put(
  "/password-update",
  authMiddleware,
  ValidationsUser.password,
  UserController.updatePassword
);
// ** Routes user ** //

// ** Routes photo ** //
routes.get("/photos/:id", authMiddleware, PhotoController.show);
routes.post(
  "/photos",
  authMiddleware,
  multer(multerConfig).single("file"),
  PhotoController.store
);
routes.delete("/photos/:id", authMiddleware, PhotoController.destroy);

// ** Routes photo ** //

// ** Routes Like ** //

routes.post("/likes/:photo", authMiddleware, LikeController.store);

// ** Routes Like ** //

// ** Routes Comment ** //

routes.post(
  "/comments/:photo",
  ValidationComment.comment,
  authMiddleware,
  CommentController.store
);
routes.put(
  "/comments/:id",
  ValidationComment.comment,
  authMiddleware,
  CommentController.update
);
routes.delete("/comments/:id", authMiddleware, CommentController.destroy);

// ** Routes Comment ** //

// ** Routes Follow ** //

routes.post("/follows/:user_id", authMiddleware, FollowController.store);

// ** Routes Follow ** //

// ** Routes Feed ** //

routes.get("/feeds", authMiddleware, FeedController.show);
routes.get("/follows", authMiddleware, FeedController.showFollow);

// ** Routes Feed ** //

// ** Routes Feed ** //

routes.get("/search/:term", authMiddleware, SearchController.search);

// ** Routes Feed ** //

module.exports = routes;

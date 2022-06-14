const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostOfFollowing,
  updateCaption,
  commentOnPost,
  deleteComment,
} = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");
var csrf = require("csurf");

const router = express.Router();

var csrfProtection = csrf({ cookie: true });

router.route("/post/upload").post(isAuthenticated, csrfProtection, createPost);

router
  .route("/post/:id")
  .get(isAuthenticated, likeAndUnlikePost)
  .put(isAuthenticated, csrfProtection, updateCaption)
  .delete(isAuthenticated, csrfProtection, deletePost);

router.route("/posts").get(isAuthenticated, getPostOfFollowing);

router
  .route("/post/comment/:id")
  .put(isAuthenticated, commentOnPost)
  .delete(isAuthenticated, csrfProtection, deleteComment);

module.exports = router;

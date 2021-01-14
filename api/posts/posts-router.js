const express = require("express");
const Posts = require("./posts-model");

const {
  logger,
  validatePostId,
  validatePost
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "posts not found" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  Posts.remove(req.post.id)
    .then(post => {
      console.log("post:", post);
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "unable to delete post" });
    });
});

router.put("/:id", validatePostId, validatePost, (req, res) => {
  Posts.update(req.params.id, req.post)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "unable to update post" });
    });
});

module.exports = router;

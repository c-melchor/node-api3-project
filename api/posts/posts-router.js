const express = require("express");
const Posts = require("./posts-model");

const {
  logger,
  validatePostId,
  validatePost
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
  logger;
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "posts not found" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  res.status(200).json(req.post);
});

router.delete("/:id", (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
});

router.put("/:id", (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
});

// do not forget to export the router

module.exports = router;

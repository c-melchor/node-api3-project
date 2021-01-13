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

router.get("/:id", (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
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

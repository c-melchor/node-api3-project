const express = require("express");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
const router = express.Router();
const {
  logger,
  validatePost,
  validateUser,
  validateUserId
} = require("../middleware/middleware");

router.post("/", validateUser, (req, res) => {
  Users.insert(req.user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "did not work" });
    });
});

router.get("/", (req, res) => {
  logger;
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "user id not found" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "unable to remove user" });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.user)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "unable to update user" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  console.log("REQ BODY:", req.body);
  const postInfo = { ...req.body, user_id: req.params.id };
  Posts.insert(postInfo)
    .then(userPost => {
      res.status(201).json(userPost);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "unable to retrieve user's posts" });
    });
});

module.exports = router;

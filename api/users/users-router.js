const express = require("express");
const Users = require("./users-model");
const router = express.Router();
const {
  logger,
  validateUser,
  validateUserId
} = require("../middleware/middleware");

router.post("/", validateUser, (req, res) => {
  res.status(201).json(req.user);
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

router.delete("/:id", (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  res.status(200).json(req.user); // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.post("/:id/posts", validateUserId, validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  res.status(201).json(req.user);
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
});

module.exports = router;

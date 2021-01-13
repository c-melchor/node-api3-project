const express = require("express");
const Users = require("./users-model");
const router = express.Router();
const {
  logger,
  validateUser,
  validateUserId
} = require("../middleware/middleware");

router.post("/", (req, res) => {
  // do your magic!
  // this needs a middleware to check that the request body is valid
});

router.get("/", (req, res) => {
  // do your magic!
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
  // do your magic!
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.delete("/:id", (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
});

router.put("/:id", (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
});

// do not forget to export the router

module.exports = router;

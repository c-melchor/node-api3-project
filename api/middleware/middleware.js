const Posts = require("../posts/posts-model");
const Users = require("../users/users-model");

function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`New ${req.method} request to ${req.url} at ${time}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const validUser = await Users.getById(req.params.id);
    if (validUser) {
      req.user = validUser;
      next();
    } else {
      res.status(404).json({ errorMessage: "id not found" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "nope" });
  }
}

async function validateUser(req, res, next) {
  try {
    const userName = await req.body;
    if (userName.name) {
      req.user = userName;
      next();
    } else {
      res.status(400).json("message:missing required name field");
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "not able to post user" });
  }
}

async function validatePostId(req, res, next) {
  try {
    const validPost = await Posts.getById(req.params.id);
    if (validPost) {
      req.post = validPost;
      next();
    } else {
      res.status(404).json({ message: "Post id not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "problem retrieving user" });
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePostId,
  validatePost
};

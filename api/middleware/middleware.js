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
      console.log("VALID:", validUser);
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
      res.status(400).json("message:missing required field");
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

async function validatePost(req, res, next) {
  try {
    const validPostFound = await req.body;
    if (validPostFound.text) {
      req.post = validPostFound;
      next();
    } else {
      res.status(404).json({ message: "Post id not found" });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePostId,
  validatePost
};

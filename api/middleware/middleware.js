const Posts = require("../posts/posts-model");
const Users = require("../users/users-model");

function logger(req, res, next) {
  // do your magic!
  const time = Date.now();
  console.log(req.method, req.url, time);
  next();
}

async function validateUserId(req, res, next) {
  // do your magic!
  const validUserId = await Posts.findById(req.params.id);
  try {
    if (validUserId) {
      req.validUserId = validUserId;
      next();
    } else {
      res.status(404).json({ errorMessage: "id not found" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "nope" });
  }
}

function validateUser(req, res, next) {
  // do your magic!
}

async function validatePostId(req, res, next) {
  // do your magic!
  try {
    const validPostId = await Posts.getById(req.params.id);
    if (validPostId) {
      req.post = validPostId;
      // console.log(validPostId);
      next();
    } else {
      res.status(404).json({ errorMessage: "id not found" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "nope" });
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePostId,
  validatePost
};

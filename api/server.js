const express = require("express");
const server = express();
const PostsRouter = require("../api/posts/posts-router");
const UsersRouter = require("../api/users/users-router");
// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and routes need to be connected here
server.use("/api/posts", PostsRouter);
server.use("/api/posts", UsersRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

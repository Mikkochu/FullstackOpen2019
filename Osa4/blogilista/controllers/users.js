const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1
  });
  response.json(users.map(u => u.toJSON()));
});

usersRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    if (body.username === undefined || body.password === undefined) {
      return response
        .status(400)
        .json({ error: "username and password are required" });
    }

    if (body.username.length < 3 || body.password.length < 3) {
      return response.status(400).json({
        error: "username and password must be at least 3 characters long"
      });
    }

    const sameUsernames = await User.find({ username: body.username });
    if (sameUsernames.length > 0) {
      return response.status(400).json({ error: "username must be unique" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;

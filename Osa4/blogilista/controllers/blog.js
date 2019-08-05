//ROUTET

const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  try {
    const allBlogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1
    });
    response.json(allBlogs.map(blog => blog.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    if (savedBlog.title === undefined && savedBlog.url === undefined) {
      response.status(400).json(savedBlog.toJSON()); //404 jos title ja url ei ole olemassa
    } else {
      response.status(201).json(savedBlog.toJSON());
    }
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const blogIdToRemove = request.params.id;

    const blogToRemove = await Blog.findById(blogIdToRemove);

    if (blogToRemove.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(blogIdToRemove);
      response.status(204).end();
    } else {
      response.status(401).json({ error: "unauthorized delete operation" });
    }
  } catch (exception) {
    next(exception);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const id = request.params.id;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
      new: true
    });
    response.status(202).json(updatedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;

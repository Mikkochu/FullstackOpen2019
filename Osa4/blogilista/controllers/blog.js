//ROUTET

const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

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

  //const user = await User.findById(body.userId);
  const users = await User.find({});
  const user = users[0];
  console.log("user", user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  });

  try {
    const savedBlog = await blog.save();
    console.log("savedBlogTitle", savedBlog);
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
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id);
    response.status(204).json(deletedBlog.toJSON());
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

//ROUTET

const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  try {
    const allBlogs = await Blog.find({});
    response.json(allBlogs.map(blog => blog.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const savedBlog = await blog.save();
    console.log("savedBlogTitle", savedBlog.title);

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

module.exports = blogRouter;

const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("Two test blogs are returned in json-format ", async () => {
  const allBlogs = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const BlogCount = allBlogs.body.length;
  const initialBlogCount = helper.initialBlogs.length;

  expect(BlogCount).toBe(initialBlogCount);
});

test("Identifiable key for id is id", async () => {
  const allBlogs = await api.get("/api/blogs");

  const blogIdField = allBlogs.body.map(blog => blog.id);
  expect(blogIdField).toBeDefined();
});

test("An new blog is added to the database ", async () => {
  const newTestBlog = {
    title: "Testi blogi",
    author: "Testi blogin kirjoittaja",
    url: "http://www.blog.com",
    likes: 100
  };

  await api
    .post("/api/blogs")
    .send(newTestBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const allBlogs = await helper.allBlogsInDB();
  const initialBlogCount = helper.initialBlogs.length;

  expect(allBlogs.length).toBe(initialBlogCount + 1);

  const title = allBlogs.map(blog => blog.title);
  expect(title).toContain("Testi blogi");
});

afterAll(() => {
  mongoose.connection.close();
});

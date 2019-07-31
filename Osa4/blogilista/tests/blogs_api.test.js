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
    title: "Uunituore blogi",
    author: "Uunituoreen blogin kirjoittaja",
    url: "http://www.newblog.com",
    likes: 100
  };

  await api
    .post("/api/blogs")
    .send(newTestBlog)
    .expect(201);

  const allBlogs = await helper.allBlogsInDB();
  const initialBlogCount = helper.initialBlogs.length;

  expect(allBlogs.length).toBe(initialBlogCount + 1);

  const title = allBlogs.map(blog => blog.title);
  expect(title).toContain("Uunituore blogi");
});

test("If blog.likes has no value, then blog.likes is zero", async () => {
  const blogWithoutLikes = {
    title: "Testiblogi ilman likeja",
    author: "Testibloggaaja",
    url: "http://www.unlikedblog.com"
  };

  const response = await api
    .post("/api/blogs")
    .send(blogWithoutLikes)
    .expect(201);

  const likesCount = response.body.likes;

  expect(likesCount).toBe(0);
});

test("Blog without title and url returns 400 bad request", async () => {
  const unknownBlog = {
    author: "Nimettömän blogin kirjoittaja"
  };

  const response = await api
    .post("/api/blogs")
    .send(unknownBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const titleUnknowBlog = response.body.title;
  const urlUnknowBlog = response.body.url;

  expect(titleUnknowBlog).toBeFalsy();
  expect(urlUnknowBlog).toBeFalsy();
});

test("Remove blog", async () => {
  const blogsBeforeDelete = await helper.allBlogsInDB();
  const blogToDelete = await blogsBeforeDelete[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAfterDelete = await helper.allBlogsInDB();
  console.log("blogsAfterDelete", blogsAfterDelete.length);

  expectedBlogCount = helper.initialBlogs.length - 1;
  receivedBlogCount = blogsAfterDelete.length;

  expect(receivedBlogCount).toBe(expectedBlogCount);
});

afterAll(() => {
  mongoose.connection.close();
});

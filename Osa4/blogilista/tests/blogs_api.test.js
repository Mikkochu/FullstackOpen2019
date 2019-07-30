const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

test("All blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Identifiable id is id", async () => {
  const response = await api.get("/api/blogs");

  const blogIdField = response.body.map(blog => blog.id); //models/blog.js on määritelty id
  //console.log("blogIDfield", blogIdField);
  expect(blogIdField).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});

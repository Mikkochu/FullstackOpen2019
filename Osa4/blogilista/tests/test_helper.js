const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Testiblogi",
    author: "Mikko",
    url: "https://mikko.com",
    likes: 7
  },
  {
    title: "Toinen testiblogi",
    author: "Höpö",
    url: "http://www.höpö.com",
    likes: 5
  }
];

const allBlogsInDB = async () => {
  const allBlogs = await Blog.find({});
  return allBlogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs,
  allBlogsInDB
};

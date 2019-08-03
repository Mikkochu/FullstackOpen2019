//Auttaa testien kanssa dummydatalla ja palauttaa kaikki blogit Json-formaatissa

const Blog = require("../models/blog");
const User = require("../models/user");

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

const allUsersInDB = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialBlogs,
  allBlogsInDB,
  allUsersInDB
};

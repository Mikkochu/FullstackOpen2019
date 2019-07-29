var lodash = require("lodash");

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const allLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return allLikes;
};

const favoriteBlog = blogs => {
  const mostLikedBlog = blogs.reduce(
    (previousBlog, currentBlog) =>
      previousBlog.likes > currentBlog.likes ? previousBlog : currentBlog,
    {}
  );

  const mostLikedBlogSimplified = [
    {
      title: mostLikedBlog.title,
      author: mostLikedBlog.author,
      likes: mostLikedBlog.likes
    }
  ];
  //console.log("mostLikedBlogSimplified", mostLikedBlogSimplified);

  return mostLikedBlogSimplified;
};

const mostBlogs = blogs => {
  const authorWithMostBlogs = lodash(blogs)
    .groupBy("author")
    .map((blog, author) => ({ author, blogs: blog.length }))
    .maxBy("blogs");

  //console.log("authorWithMostBlogs", authorWithMostBlogs);
  return authorWithMostBlogs;
};

const mostLikes = blogs => {
  const result = lodash(blogs)
    .groupBy("author")
    .map((blogs, author) => {
      const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
      //console.log("likes", likes);
      return { author, likes };
    })
    .maxBy("likes");

  console.log("result", result);
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};

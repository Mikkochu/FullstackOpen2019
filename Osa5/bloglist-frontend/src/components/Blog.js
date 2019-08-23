import React from "react";
const Blog = ({ blog, fullBlogInfo, toggleFullBlogInfo }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <div onClick={() => toggleFullBlogInfo()}>
        {blog.title} {blog.author}
      </div>
      <div style={fullBlogInfo}>
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes <button>like</button>
        </p>
        <p>added by {blog.user.name}</p>
      </div>
    </div>
  );
};

export default Blog;

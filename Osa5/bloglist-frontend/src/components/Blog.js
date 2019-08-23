import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [fullBlog, setFullBlog] = useState(false);

  const fullBlogInfo = { display: fullBlog ? "" : "none" };

  const toggleFullBlogInfo = () => {
    setFullBlog(!fullBlog);
  };

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
        <p>added by </p>
        <button>remove</button>
      </div>
    </div>
  );
};

export default Blog;

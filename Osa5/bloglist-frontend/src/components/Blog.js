import React, { useState } from "react";

const Blog = ({ blog, blogService, blogs, setBlogs }) => {
  const [fullBlog, setFullBlog] = useState(false);

  const fullBlogInfo = { display: fullBlog ? "" : "none" };

  const toggleFullBlogInfo = () => {
    setFullBlog(!fullBlog);
  };

  const handleLike = () => {
    blog.likes++;
    blogService.update(blog.id, blog);
    setBlogs(blogs.map(OldBlog => (OldBlog.id === blog.id ? blog : OldBlog)));
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
          {blog.likes} likes <button onClick={() => handleLike()}>like</button>
        </p>
        <p>added by </p>
        <button>remove</button>
      </div>
    </div>
  );
};

export default Blog;

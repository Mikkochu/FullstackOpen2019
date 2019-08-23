import React, { useState } from "react";

const Blog = ({ blog, blogService, blogs, setNewBlogs, user }) => {
  const [fullBlog, setFullBlog] = useState(false);

  const fullBlogInfo = { display: fullBlog ? "" : "none" };

  const toggleFullBlogInfo = () => {
    setFullBlog(!fullBlog);
  };

  const handleLike = () => {
    blog.likes++;
    blogService.update(blog.id, blog);

    setNewBlogs(
      blogs.map(oldBlog => (oldBlog.id === blog.id ? blog : oldBlog))
    );
  };

  const handleRemoveClick = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id);
      setNewBlogs(blogs.filter(x => x.id !== blog.id));
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const removeButtonVisible =
    blog.user[0].username === user.name ? true : false;

  const showRemoveButton = {
    display: removeButtonVisible ? "" : "none"
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
        <p>added by {blog.user[0].username} </p>

        <button style={showRemoveButton} onClick={() => handleRemoveClick()}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;

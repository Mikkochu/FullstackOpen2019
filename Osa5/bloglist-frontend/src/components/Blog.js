import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, blogService, blogs, reorderBlogs, user }) => {
  const [fullBlog, setFullBlog] = useState(false);

  const fullBlogInfo = { display: fullBlog ? "" : "none" };

  const toggleFullBlogInfo = () => {
    setFullBlog(!fullBlog);
  };

  const handleLike = () => {
    blog.likes++;
    blogService.update(blog.id, blog);

    reorderBlogs(
      blogs.map(oldBlog => (oldBlog.id === blog.id ? blog : oldBlog))
    );
  };

  const handleRemoveClick = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id);
      reorderBlogs(blogs.filter(x => x.id !== blog.id));
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
      <div onClick={() => toggleFullBlogInfo()} className="titleAuthor">
        {blog.title} {blog.author}
      </div>
      <div style={fullBlogInfo} className="fullInfo">
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogService: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setNewBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};
export default Blog;

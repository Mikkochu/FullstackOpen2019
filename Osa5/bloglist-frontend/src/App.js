import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then(response => {
      setBlogs(response);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      //console.log("user", user);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      //console.log("window.localStorage", window.localStorage);

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("error in login");
    }
  };

  const handleLogout = event => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  const handleCreate = async event => {
    event.preventDefault();
    //console.log("painettu");

    const newBlog = {
      title,
      author,
      url
    };

    const savedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(savedBlog));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username {"  "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password {"  "}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const showBlogs = () => (
    <div>
      <br />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  if (user === null) {
    return (
      <div>
        <h2>Log into application</h2>
        {loginForm()}
      </div>
    );
  }

  const createBlogs = () => (
    <form onSubmit={handleCreate}>
      <div>
        title {"  "}
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author {"  "}
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url {"  "}
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );

  return (
    <div>
      <h2>Blogs</h2>
      {user.name} logged in {"  "}
      <button onClick={handleLogout}> logout</button>
      <h2>Create a new blog</h2>
      {createBlogs()}
      {showBlogs()}
    </div>
  );
}

export default App;
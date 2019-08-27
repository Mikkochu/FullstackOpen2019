import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import { useField } from "./hooks";

function App() {
  //const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const username = useField("text");
  const password = useField("password");

  useEffect(() => {
    blogService.getAll().then(response => {
      handleLikesChange(response);
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

  const handleLikesChange = newBlogs => {
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes));
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });
      //console.log("user", user);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      //console.log("window.localStorage", window.localStorage);

      blogService.setToken(user.token);
      setUser(user);
      username.reset();
      password.reset();
    } catch (exception) {
      setErrorMessage("wrong username or password");
      password.reset();
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = event => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  const handleCreate = async event => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url
    };

    const handleNotification = async savedBlog => {
      await setNotification(
        `a new blog ${savedBlog.title} by ${savedBlog.author} added`
      );
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    };

    const savedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(savedBlog));
    handleNotification(savedBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const showBlogs = () => (
    <div>
      <br />
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          blogService={blogService}
          blogs={blogs}
          reorderBlogs={handleLikesChange}
          user={user}
        />
      ))}
    </div>
  );

  const createBlogs = () => (
    <Togglable buttonLabel="A new blog">
      <br />
      <h2>Create a new blog</h2>
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
    </Togglable>
  );

  if (user === null) {
    return (
      <div>
        <h2>Log into application</h2>
        <Notification message={errorMessage} />
        <br />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <br />
      <Notification message={notification} />
      <br />
      {user.name} logged in {"  "}
      <button onClick={handleLogout}> logout</button>
      <p />
      {createBlogs()}
      {showBlogs()}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

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
      console.log("window.localStorage", window.localStorage);

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
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

  return (
    <div>
      <h2>Blogs</h2>
      {user.name} logged in <button onClick={handleLogout}> logout</button>
      {showBlogs()}
    </div>
  );
}

export default App;

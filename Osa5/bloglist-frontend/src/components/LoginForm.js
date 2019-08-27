import React from "react";

const LoginForm = ({ username, password, handleLogin }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username: <input {...username} reset={null} />
        </div>
        <div>
          password: <input {...password} reset={null} />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

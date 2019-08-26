import React from "react";
import { render, waitForElement, cleanup } from "@testing-library/react";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  afterEach(cleanup);
  test("if no user logged, notes are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("login"));

    const blogsWithoutLogin = component.container.querySelectorAll(
      ".titleAuthor"
    );
    expect(blogsWithoutLogin.length).toBe(0);
  });

  test("blogs are rendered when user is logged in", async () => {
    const user = {
      username: "tester",
      name: "Donald Tester",
      token: "1231231214"
    };

    localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getAllByText("logout"));
    component.debug();

    const blogsWithLogin = component.container.querySelectorAll(".titleAuthor");
    //console.log("blogsWithLogin", blogsWithLogin);
    expect(blogsWithLogin.length).toBe(2);
  });
});

import React from "react";
import { render, waitForElement } from "@testing-library/react";
jest.mock("./services/blogs");
import App from "./App";

const user = {
  username: "tester",
  name: "Donald Tester",
  token: "1231231214"
};

describe("<App />", () => {
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
    localStorage.setItem("loggedUser", JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getAllByText("login"));

    //localStorage.setItem("loggedUser", JSON.stringify(user));
    component.rerender(<App />);

    const blogsWithLogin = component.container.querySelectorAll(".titleAuthor");
    expect(blogsWithLogin.length).toBe(2);
  });
});

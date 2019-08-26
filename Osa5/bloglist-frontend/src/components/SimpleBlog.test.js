import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";

describe("SimpleBlog tests", () => {
  afterEach(cleanup);
  let component;
  let mockHandler;

  beforeEach(() => {
    mockHandler = jest.fn();

    const testBlog = {
      title: "testiOtsikko",
      author: "testiKirjailija",
      url: "www.blog.fi",
      likes: 10
    };
    component = render(<SimpleBlog blog={testBlog} onClick={mockHandler} />);
  });

  test("TEST_1: renders title,author and likes", () => {
    expect(component.container).toHaveTextContent("testiOtsikko");
    expect(component.container).toHaveTextContent("testiKirjailija");
    expect(component.container).toHaveTextContent("blog has 10 likes");
  });

  test("TEST_2: clicking the SimpleBlog-button twice calls event handler twice", async () => {
    const button = component.getByText("like");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});

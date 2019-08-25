import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";

afterEach(cleanup);

test("renders title,author and likes", () => {
  const testBlog = {
    title: "testiOtsikko",
    author: "testiKirjailija",
    likes: 10
  };

  const component = render(<SimpleBlog blog={testBlog} />);
  //component.debug();

  expect(component.container).toHaveTextContent("testiOtsikko");
  expect(component.container).toHaveTextContent("testiKirjailija");
  expect(component.container).toHaveTextContent("blog has 10 likes");
});

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog tests", () => {
  afterEach(cleanup);
  let component;
  let mockHandler;
  let testBlog;

  beforeEach(() => {
    mockHandler = jest.fn();

    const user = {
      username: "testiKäyttäjä",
      name: "testiSalasana"
    };

    testBlog = {
      title: "testiOtsikko",
      author: "testiKirjailija",
      url: "www.blogi.fi",
      likes: 10,
      user: [{ username: "testiKäyttäjä", name: "testiSalasana" }]
    };

    component = render(
      <Blog blog={testBlog} onClick={mockHandler} user={user} />
    );

    //component.debug;
  });

  test("at start only the title and author are visible", () => {
    const titleAuthor = component.container.querySelector(".titleAuthor");
    const fullInfo = component.container.querySelector(".fullInfo");

    expect(titleAuthor).toHaveTextContent("testiOtsikko testiKirjailija");

    expect(titleAuthor).toHaveStyle("display: ");
    expect(fullInfo).toHaveStyle("display: none");
  });

  test("clicking a blog opens a full view", () => {
    /*let blogButton = component.getByText(
      testBlog.title + " " + testBlog.author
    );
    */

    const titleAuthor = component.container.querySelector(".titleAuthor");
    const fullInfo = component.container.querySelector(".fullInfo");

    expect(titleAuthor).toHaveStyle("display: ");
    expect(fullInfo).toHaveStyle("display: none");

    fireEvent.click(titleAuthor);
    //expect(mockHandler.mock.calls.length).toBe(1);

    expect(titleAuthor).toHaveTextContent("testiOtsikko testiKirjailija");
    expect(fullInfo).toHaveTextContent("www.blogi.fi");
    expect(fullInfo).toHaveTextContent("10 likes");

    expect(titleAuthor).toHaveStyle("display: ");
    expect(fullInfo).toHaveStyle("display: ");
  });
});

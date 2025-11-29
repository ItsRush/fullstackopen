import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

test("renders blog title and author but not URL or likes by default", () => {
  const blog = {
    title: "Arma Reforger", // Changed to match what you're testing for
    author: "Arma",
    url: "armareforger.com",
    likes: 201,
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog-short");
  screen.debug(div);
  expect(div).toHaveTextContent("Arma Reforger");
  expect(div).toHaveTextContent("Arma");

  expect(div).not.toHaveTextContent("armareforger.com");
  expect(div).not.toHaveTextContent("201");
});

test("clicking the button shows URL and number of likes", async () => {
  const blog = {
    title: "Arma Reforger",
    author: "Arma",
    url: "armareforger.com",
    likes: 201,
  };

  const mockLikeBlog = vi.fn();

  const { container } = render(<Blog blog={blog} likeBlog={mockLikeBlog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".blog-extended");
  screen.debug(div);
  expect(div).toHaveTextContent("armareforger.com");
  expect(div).toHaveTextContent("likes: 201");
});

test("clicking the like button twice calls the event handler twice", async () => {
  const blog = {
    title: "Arma Reforger",
    author: "Arma",
    url: "armareforger.com",
    likes: 201,
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} likeBlog={mockHandler} />);

  const user = userEvent.setup();

  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByLabelText("title:");
  const authorInput = screen.getByLabelText("author:");
  const urlInput = screen.getByLabelText("url:");
  const sendButton = screen.getByText("create");

  await user.type(titleInput, "testing a form...");
  await user.type(authorInput, "Test");
  await user.type(urlInput, "http://example.com");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
  expect(createBlog.mock.calls[0][0].author).toBe("Test");
  expect(createBlog.mock.calls[0][0].url).toBe("http://example.com");

  console.log(createBlog.mock.calls);
});

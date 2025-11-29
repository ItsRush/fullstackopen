import { useState } from "react";

const Blog = ({ blog, likeBlog, deleteBlog, currentUser }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    padding: 5,
    border: "solid",
    borderWidth: 1,
    margin: "auto",
    marginTop: 5,
  };

  const handleShowAll = () => {
    setVisible(!visible);
  };

  const handleLikeClick = () => {
    likeBlog(blog);
  };

  const handleDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog);
    }
  };

  const isBlogCreator =
    currentUser && blog.user && currentUser.username === blog.user.username;

  const allInfo = (
    <div style={blogStyle} className="blog-extended">
      <p>
        {blog.title} <button onClick={handleShowAll}>hide</button>
      </p>
      <p>{blog.url}</p>
      <p>
        likes: {blog.likes} <button onClick={handleLikeClick}>like</button>
      </p>
      <p>{blog.author}</p>
      {isBlogCreator && (
        <button
          style={{ backgroundColor: "lightSkyBlue" }}
          onClick={handleDeleteBlog}
        >
          remove
        </button>
      )}
    </div>
  );

  const shortInfo = (
    <div style={blogStyle} className="blog-short">
      {blog.title} {blog.author} <button onClick={handleShowAll}>view</button>
    </div>
  );

  return <div>{visible ? allInfo : shortInfo}</div>;
};

export default Blog;

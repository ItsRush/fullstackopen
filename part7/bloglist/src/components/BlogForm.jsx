import { useState } from "react";
import { useDispatch } from "react-redux";
import notificationReducer, { setClear, setError, setSuccess } from "../reducers/notificationReducer";
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  //const [likes, setLikes] = useState('')
  const dispatch = useDispatch()
  const addBlog = (event) => {

    event.preventDefault();

    if(!title || !author || !url) {
      dispatch(setError('Please fill out all the fields'))
      setTimeout(() => {
        dispatch(setClear())
      }, 5000);
      return
    }
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    dispatch(setSuccess(`${author} created '${title}'`))
    setTimeout(() => {
        dispatch(setClear())
    }, 5000);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      
      <form onSubmit={addBlog}>
        <h2>Create a new blog</h2>
        <div>
          <label>
            title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;

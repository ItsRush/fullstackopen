import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    margin: 'auto',
    marginTop: 5
  }

  const handleShowAll = () => {
    setVisible(!visible)
  }

  const allInfo = 
    <div style={blogStyle}>
      <p>{blog.title} <button onClick={handleShowAll}>hide</button></p>
      <p>{blog.url}</p>
      <p>{blog.likes} <button>like</button></p>
      <p>{blog.author}</p>
    </div>

  const shortInfo = 
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={handleShowAll}>view</button>
    </div>

  return (
    <div>
      { visible ? shortInfo : allInfo} 
    </div>
  )
}

export default Blog
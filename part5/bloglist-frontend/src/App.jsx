import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=> {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title,
        author,
        url
      }

    const createdBlog = await blogService.create(newBlog)

    setSuccessMessage(`a new blog ${createdBlog.title} by ${createdBlog.author}`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000);
    setBlogs(blogs.concat(createdBlog))
    setTitle('')
    setAuthor('')
    setUrl('')

    } catch{
      setErrorMessage(`Failed to create a new blog`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    } 
  }

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>
      <form onSubmit = {handleLogin}>
        <div>
          <label>
            username 
            <input type='text' value={username} onChange={({target}) => setUsername(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            password 
            <input type='text' value={password} onChange={({target}) => setPassword(target.value)}/>
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
    <h1>Blogs</h1>
    <Notification errorMessage={errorMessage} successMessage={successMessage}/>
    <p>{user.name} logged in </p>
    <button onClick={handleLogOut}>logout</button>
      <form onSubmit={handleCreateBlog}>
        <h1>create new</h1>
        <div>
        <label>
          title:
          <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
        </label>
        </div>
        <div>
        <label>
          author:
          <input type="text" value={author} onChange={({target}) => setAuthor(target.value)}/>
        </label>
        </div>
        <div>
        <label>
          url:
          <input type="text" value={url} onChange={({target}) => setUrl(target.value)}/>
        </label>
        </div>
        <button type='submit'>create</button>
      </form>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>

  )
  return (
    <div>
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  )
}

export default App
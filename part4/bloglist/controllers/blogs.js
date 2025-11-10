require('dotenv').config()
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(!user) {
    return response.status(400).json({ error: 'userId missing or not valid'})
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await Blog
    .findById(savedBlog._id)
    .populate('user', { username: 1, name: 1 })
    
  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', async (request,response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'})
  }

  const user = await User.findById(decodedToken.id)

  if(!user) {
    return response.status(401).json({ error: 'UserId missing or not valid'})
  }

  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 }) 

  if(!blog) {
    return response.status(404).json({ error: 'Blog does not exist'})
  }
  
  const userid = decodedToken.id

  if(blog.user.id.toString() === userid.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
  } else {
    response.status(401).json({ error: 'token invalid'})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const likes = request.body.likes

  const blog = await Blog.findById(request.params.id)

  if(!blog) { response.status(404).end() }

  blog.likes = likes

  const updatedBlog = await blog.save()

  const populatedBlog = await Blog
    .findById(updatedBlog._id)
    .populate('user', { username: 1, name: 1 })
    
  response.json(populatedBlog)
})

module.exports = blogsRouter
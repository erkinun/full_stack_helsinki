const blogsListRouter = require("express").Router();
const Blog = require("../models/blog");

blogsListRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsListRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})
module.exports = blogsListRouter;
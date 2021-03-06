import axios from 'axios'

const baseUrl = '/api/blogs'
let token = ''

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getBlogBy = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createBlog = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateLikes = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

const removeBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addNewComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

const blogService = {
  getAll,
  getBlogBy,
  setToken,
  createBlog,
  updateLikes,
  removeBlog,
  addNewComment
}

export default blogService

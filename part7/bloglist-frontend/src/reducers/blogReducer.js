import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.payload
    case 'CREATE_BLOG':
      return [...state, action.payload]
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.id)
    case 'UPDATE_BLOG': {
      return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
    }
    case 'ADD_NEW_COMMENT': {
      return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      payload: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const returnedBlog = await blogService.createBlog(blog)
    const newBlog = await blogService.getBlogBy(returnedBlog.id)
    dispatch({
      type: 'CREATE_BLOG',
      payload: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.removeBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.updateLikes(blog)
    const newBlog = await blogService.getBlogBy(updatedBlog.id)
    dispatch({
      type: 'UPDATE_BLOG',
      payload: newBlog
    })
  }
}

export const addNewComment = (blogId, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addNewComment(blogId, comment)
    const newBlog = await blogService.getBlogBy(updatedBlog.id)
    dispatch({
      type: 'ADD_NEW_COMMENT',
      payload: newBlog
    })
  }
}

export default blogReducer

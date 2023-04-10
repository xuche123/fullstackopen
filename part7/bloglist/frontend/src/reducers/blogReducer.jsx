import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const id = action.payload.id
      return state.map((b) => (b.id === id ? action.payload : b))
    },
    deleteBlog(state, action) {
      const id = action.payload.id
      return state.filter((b) => b.id !== id)
    },
  },
})

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const postBlog = (blog, user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog, user.token)
    dispatch(addBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, {
      likes: blog.likes + 1,
    })
    dispatch(updateBlog(updatedBlog))
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    const commentObject = { comment: comment }
    const updatedBlog = await blogService.comment(blog.id, commentObject)
    console.log('update', updatedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const removeBlog = (blog, token) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id, token)
    dispatch(deleteBlog(blog))
  }
}

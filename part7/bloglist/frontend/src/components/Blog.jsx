import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import userService from '../services/users'

const Blog = ({ handleLike, user, handleDelete }) => {
  const id = useParams().id
  const [blog, setBlog] = useState(null)
  const [poster, setPoster] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlog = async () => {
      const blog = await blogService.getBlog(id)
      const poster = await userService.getUser(blog.user)
      setPoster(poster)
      setBlog(blog)
    }
    fetchBlog()
  }, [id])

  const addLike = () => {
    // if (liked) return
    handleLike(blog)
    // setLiked(true)
  }

  const handleRemove = () => {
    handleDelete(blog)
    navigate('/')
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <div>
        <h2>
          <span id="title">{blog.title}</span>{' '}
          <span id="author">{blog.author}</span>
        </h2>

        <div>
          <a href={`http://${blog.url}`}>{blog.url}</a>
          <div id="likes">
            likes {blog.likes} &nbsp;
            <button id="like-btn" onClick={addLike}>
              like
            </button>
          </div>
          <div id="user">added by {poster.name}</div>
          {user && poster.username === user.username && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog

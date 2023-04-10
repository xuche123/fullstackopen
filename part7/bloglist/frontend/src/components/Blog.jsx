import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'

const Blog = ({ handleLike, user, handleDelete, handleComment }) => {
  const id = useParams().id
  const [blog, setBlog] = useState(null)

  const navigate = useNavigate()

  const addLike = () => {
    // if (liked) return
    handleLike(blog)
    // setLiked(true)
  }

  const handleRemove = () => {
    handleDelete(blog)
    navigate('/')
  }

  useEffect(() => {
    const fetchBlog = async () => {
      const blog = await blogService.getBlog(id)
      setBlog(blog)
    }
    fetchBlog()
  }, [handleLike])

  if (!blog) {
    return null
  }

  const CommentForm = () => {
    const [comment, setComment] = useState('')

    const addComment = (event) => {
      event.preventDefault()
      handleComment(blog, comment)
    }

    return (
      <form onSubmit={addComment}>
        <div className="flex flex-col">
          <label htmlFor="title">comment</label>
          <textarea
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            id="title"
          />
        </div>

        <button
          type="submit"
          id="create-blog-button"
          className="btn btn-sm btn-outline btn-pri"
        >
          add comment
        </button>
      </form>
    )
  }

  return (
    <div className="blog prose">
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
          <div id="user">added by {blog.user_name}</div>
          {user && blog.user_username === user.username && (
            <button
              onClick={handleRemove}
              className="btn btn-error btn-outline btn-sm"
            >
              remove
            </button>
          )}

          <CommentForm />
          <h3>comments</h3>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment}>{comment}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Blog

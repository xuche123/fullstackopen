import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, user, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  // const [liked, setLiked] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLike = () => {
    // if (liked) return
    handleLike(blog)
    // setLiked(true)
  }

  const handleRemove = () => {
    handleDelete(blog)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <span id="title">{blog.title}</span>{' '}
        <span id="author">{blog.author}</span> &nbsp;
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
        {visible && (
          <div>
            <div id="url">{blog.url}</div>
            <div id="likes">
              likes {blog.likes} &nbsp;
              <button id="like-btn" onClick={addLike}>
                like
              </button>
            </div>
            <div id="user">{blog.user.name}</div>
            {user && blog.user.username === user.username && (
              <button onClick={handleRemove}>remove</button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  user: PropTypes.object,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog

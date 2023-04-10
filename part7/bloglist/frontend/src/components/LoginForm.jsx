import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <article className="prose">
        <h2>Log in to application</h2>

        <div className="flex flex-col">
          <label htmlFor="username">username </label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            id="username"
            className="h-8 my-1"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">password </label>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            id="password"
            className="h-8 my-1"
          />
        </div>

        <button
          type="submit"
          id="login-button"
          className="btn btn-sm btn-wide btn-outline my-1"
        >
          login
        </button>
      </article>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
}

export default LoginForm

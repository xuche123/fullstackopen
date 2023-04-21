import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('book-user-token')) {
      setToken(localStorage.getItem('book-user-token'))
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.removeItem('book-user-token')
  }

  const notify = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>
        <div style={{ color: 'red' }}>{error}</div>
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  } 

  return (
    <div>
      <div style={{ color: 'red' }}>{error}</div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} notify={notify} />
    </div>
  )
}

export default App

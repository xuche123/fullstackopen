import { useQuery, useMutation } from '@apollo/client'
import { GET_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'

const Authors = ({ show }) => {
  const result = useQuery(GET_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }]
  })
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors || [];

  const onSubmit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: Number(born) } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={onSubmit}>
        name
        {<select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>}

        <div>
          born
          <input value={born} onChange={({target}) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors

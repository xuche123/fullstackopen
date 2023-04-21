import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_BOOKS, ME } from '../queries'

const Recommendations = ({ show }) => {
  const user = useQuery(ME)
  const books = useQuery(GET_BOOKS)
  const [genre, setGenre] = useState("")
  
  useEffect(() => {
    if (user.data) {
      setGenre(user.data.me.favoriteGenre)
    }
  }, [user.data])
  

  if (!show) {
    return null
  }

  const booksToShow = books.data.allBooks.filter((book) => book.genres.includes(genre))
  console.log(booksToShow)


  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{genre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
import { useQuery } from "@apollo/client"
import { GET_BOOKS } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const result = useQuery(GET_BOOKS, { variables: { genre:null } })

  const [genre, setGenre] = useState(null)

  const genreQuery = useQuery(GET_BOOKS, { variables: { genre }, skip: !genre })

  if (!props.show) {
    return null
  }
 
  const genres = [...new Set(result.data.allBooks.map((book) => book.genres).flat())]
  
  const books = genreQuery.data ? genreQuery.data.allBooks : result.data.allBooks
  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books

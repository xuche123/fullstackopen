import { useQuery } from "@apollo/client"
import { GET_BOOKS } from "../queries"
import { useState, useEffect } from "react"

const Books = (props) => {
  const result = useQuery(GET_BOOKS)
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState("all")

  useEffect(() => {
    if (result.data) {
      const genres = [...new Set(result.data.allBooks.map((book) => book.genres).flat())]
      setGenres(genres)
    }

  }, [result.data])

  if (!props.show) {
    return null
  }

  let books = result.data.allBooks || []

  if (genre !== "all") {
    books = books.filter((book) => book.genres.includes(genre))
  }
  
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
        <button onClick={() => setGenre("all")}>all genres</button>
      </div>
    </div>
  )
}

export default Books

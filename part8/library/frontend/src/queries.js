import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const GET_BOOKS = gql`
  query {
    allBooks {
      author {
        name
      }
      published
      title
    }
  } 
`

export const ADD_BOOK = gql`
  mutation Mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      published
      title
      author
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation Mutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`
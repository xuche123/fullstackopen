import anecdoteService from '../services/anecdotes'
import { useMutation, useQueryClient } from 'react-query'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  // eslint-disable-next-line no-unused-vars
  const [notification, dispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation(anecdoteService.createAnecdote, {
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries('anecdotes')
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      dispatch({
        type: "SET",
        payload: `anecdote '${newAnecdote.content}' added`
      })
      setTimeout(() => {
        dispatch({
          type: "RESET"
        })
      }, 5000);
    },
    onError: () => {
      dispatch({
        type: "SET",
        payload: "anecdote must be 5 or more characters long."
      })
      setTimeout(() => {
        dispatch({
          type: "RESET"
        })
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

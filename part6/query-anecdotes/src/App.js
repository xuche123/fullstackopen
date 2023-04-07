import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useReducer } from 'react'
import NotificationContext from './components/NotificationContext'

const App = () => {
  const notificationReducer = (state, action) => {
    switch (action.type) {
      case "SET":
        return action.payload
      case "RESET":
        return null
      default:
        return state
    }
  }

  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const queryClient = useQueryClient()

  const voteMutation = useMutation(anecdoteService.vote, {
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries('anecdotes')
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id === newAnecdote.id ? newAnecdote : anecdote))
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({
      type: "SET",
      payload: `anecdote '${anecdote.content}' voted`
    })
    setTimeout(() => {
      notificationDispatch({
        type: "RESET"
      })
    }, 5000);
  }

  const result = useQuery(
    'anecdotes', anecdoteService.getAll, {
    refetchOnWindowFocus: false
  }
  )

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <Notification />
        <AnecdoteForm />
      </NotificationContext.Provider>
      

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

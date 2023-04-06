import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const App = () => {
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
    voteMutation.mutate({...anecdote, votes:anecdote.votes+1})
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

      <Notification />
      <AnecdoteForm />

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

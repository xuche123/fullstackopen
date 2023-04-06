import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotifications } from '../reducers/notificationReducer'

const Anecdotes = () => {

    const dispatch = useDispatch()

    const anecdotes = useSelector(({anecdotes, filter}) => {
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })
    
    const vote = (anecdote) => {
        // dispatch(voteAnecdote(id))
        // const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(voteForAnecdote(anecdote))
        dispatch(setNotifications(`you voted for: ${anecdote.content}`, 5))
    }

    return (
        <div>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Anecdotes
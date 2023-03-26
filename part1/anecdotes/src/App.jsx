import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Anecdotes = ({ anecdotes, handleRandom, handleVote, votes, selected, max}) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleRandom} text="random" />
      <br />
      <h1>Anecdotes with most votes</h1>
      <p>{anecdotes[max]}</p>
      <p>has {votes[max]}</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleRandom = () => {
    let random = Math.floor(Math.random() * (anecdotes.length - 1))
    setSelected(random)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  let max = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Anecdotes anecdotes={anecdotes} handleVote={handleVote} handleRandom={handleRandom} selected={selected} votes={votes} max={max} />
    </div>
  )
}

export default App
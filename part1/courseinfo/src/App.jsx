import React from 'react'

const Header = ({course}) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({part1, part2, part3}) => {
  return (
    <div>
      <Part name={part1.name} exercise={part1.exercises} />
      <Part name={part2.name} exercise={part2.exercises} />
      <Part name={part3.name} exercise={part3.exercises} />
    </div>
  )
}

const Part = ({ name, exercise }) => {
  return (
    <p>
      {name} {exercise}
    </p>
  )
}

const Total = ({ exercise1, exercise2, exercise3 }) => {

  return (
    <p>
      Number of exercises { exercise1 + exercise2 + exercise3 }
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content part1={parts[0]} part2={parts[1]} part3={parts[2]} />
      <Total exercise1={parts[0].exercises} exercise2={parts[1].exercises} exercise3={parts[2].exercises} />
    </div>
  )
}

export default App
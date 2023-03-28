const Header = ({ name }) => <h1>{name}</h1>;

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        </div>
    )
}

const Part = ({ part, exercises }) => {
    return (
        <p>{part} {exercises}</p>
    )
}

const Total = ({ exercise1, exercise2, exercise3 }) => {

    return (
        <p>
            Number of exercises {exercise1 + exercise2 + exercise3}
        </p>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

export default Course
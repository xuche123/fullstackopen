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

const Course = ({ course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <p><strong>total of {total} exercises</strong></p>
        </>
    )
}

export default Course
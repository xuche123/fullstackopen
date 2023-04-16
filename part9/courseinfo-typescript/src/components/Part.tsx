import { type CoursePart } from '../types'

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
          </p>
          <p>{part.description}</p>
        </div>
      )
    case 'group':
      return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
          </p>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
    case 'background':
      return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
          </p>
          <p>{part.description}</p>
          <p><a href={part.backgroundMaterial}>{ part.backgroundMaterial}</a></p>
        </div>
      )
    default:
      return assertNever(part)
  }
}

export default Part

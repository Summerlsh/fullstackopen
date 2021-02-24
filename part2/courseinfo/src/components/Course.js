const Header = ({ course }) => <h2>{course}</h2>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Part = ({ part, exercises }) => <p>{part} {exercises}</p>

const Total = ({ parts }) => (
  <p>
    <b>total of {parts.reduce((acc, cur) => acc + cur.exercises, 0)} exercises</b>
  </p>
)

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course

import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = () => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
    </>
  )
}

const Total = () => {
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'

  return (
    <div>
      <Header course={course}/>
      <Content/>
      <Total/>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));

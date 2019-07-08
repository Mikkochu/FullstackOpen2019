import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  console.log("Header", props);
  let name = props.course;
  return <h2>{name}</h2>;
};

const Part = props => {
  console.log("Part", props);
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  console.log("Content", parts);
  //courses funktio looppaa listan läpi ja Part-komponentti renderöi sen
  const courses = () => parts.map(part => <Part key={part.id} part={part} />);

  return <div>{courses()}</div>;
};

const Total = ({ parts }) => {
  let sumOfExercises = () =>
    parts.reduce((sum, part) => sum + part.exercises, 0);

  console.log("Total exercises", sumOfExercises());

  return (
    <div>
      <h4>Total of {sumOfExercises()} exercises</h4>
    </div>
  );
};

const Course = ({ courses }) => {
  console.log("Courses", courses);

  const allCourses = () =>
    courses.map(course => (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ));

  return <>{allCourses()}</>;
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: "Node.js",
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  console.log("App", courses);

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

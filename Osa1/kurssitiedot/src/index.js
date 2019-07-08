import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  console.log(props.course);
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
};

const Content = props => {
  return (
    <div>
      <Part n={props.parts[0]} />
      <Part n={props.parts[1]} />
      <Part n={props.parts[2]} />
    </div>
  );
};

const Total = props => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </div>
  );
};

const Part = prop => {
  return (
    <div>
      <p>
        {prop.n.name} {prop.n.exercises}{" "}
      </p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

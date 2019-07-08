import React from "react";

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
  //Summataan osien harjoitukset yhteen
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
  //Loopataan kaikki kurssit map-funktion avulla

  const allCourses = () =>
    courses.map((course, index) => (
      <>
        <Header key={index} course={course.name} />
        <Content key={index} parts={course.parts} />
        <Total key={index} parts={course.parts} />
      </>
    ));

  return <>{allCourses()}</>;
};

export default { Course };

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  const { parts } = props;
  return (
    <>
      {parts.map((part, index) => {
        return <Part key={index} part={part} />;
      })}
    </>
  );
};

const Part = (props) => {
  const { name, exercises } = props.part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = (props) => {
  const { parts } = props;

  const numOfExercises = parts.reduce((accumulator, part) => {
    return part.exercises + accumulator;
  }, 0);

  return <p>Number of exercises {numOfExercises}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 },
    ],
  };

  return (
    <div className="App">
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;

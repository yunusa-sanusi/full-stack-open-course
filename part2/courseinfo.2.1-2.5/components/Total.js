import React from 'react';

const Total = (props) => {
  const { parts } = props;

  const numOfExercises = parts.reduce(
    (accumulator, part) => part.exercises + accumulator,
    0,
  );

  return <h4>total of {numOfExercises} exercises</h4>;
};

export default Total;

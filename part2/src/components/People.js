import React from 'react';
import Person from './Person';

const People = (props) => {
  const { people, deletePerson } = props;
  return (
    <>
      <h2>Numbers</h2>
      {people.map((person) => {
        return (
          <Person key={person.id} person={person} deletePerson={deletePerson} />
        );
      })}
    </>
  );
};

export default People;

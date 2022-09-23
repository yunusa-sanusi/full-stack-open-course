import React from 'react';

const Person = (props) => {
  const { person, deletePerson } = props;
  return (
    <p>
      {person.name} {person.number}
      <button type="button" onClick={() => deletePerson(person.id)}>
        delete
      </button>
    </p>
  );
};

export default Person;

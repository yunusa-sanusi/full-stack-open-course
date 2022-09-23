import React from 'react';

const AddNameForm = (props) => {
  const {
    name,
    number,
    handleSubmit,
    handleNameInputChange,
    handleNumberInputChange,
  } = props;

  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input type="text" onChange={handleNameInputChange} value={name} />
        </div>
        <div>
          number:{' '}
          <input
            type="text"
            onChange={handleNumberInputChange}
            value={number}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default AddNameForm;

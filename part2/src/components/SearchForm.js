import React from 'react';

const SearchForm = (props) => {
  const { handleSearchInput } = props;
  return (
    <div>
      filter shown with <input onChange={handleSearchInput} type="search" />
    </div>
  );
};

export default SearchForm;

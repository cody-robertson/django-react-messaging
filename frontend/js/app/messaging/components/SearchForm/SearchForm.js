import PropTypes from 'prop-types';
import React from 'react';

const SearchForm = ({ setQuery, query }) => {
  return (
    <form>
      <h3>Search for a conversation</h3>
      <input
        content={query}
        name="search"
        type="text"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
    </form>
  );
}

SearchForm.propTypes = {
  setQuery: PropTypes.func,
  query: PropTypes.string,
};

export default SearchForm;

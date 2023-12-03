import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function SearchBar({ searchTerm, handleSearch }) {
  return (
    <div className='inp' >
      <FontAwesomeIcon icon="search" />

      <input
        className='inpbox'
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
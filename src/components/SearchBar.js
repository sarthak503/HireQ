import React from 'react';

function SearchBar({ searchTerm, handleSearch }) {
  return (
    <div className='inp' >
    <div>🔎</div>
    <input
      className='inpbox'
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearch}
    />
    </div>
  );
}

export default SearchBar;
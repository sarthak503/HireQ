import React from 'react';

function Pagination({ currentPage, paginate, filteredUsers, usersPerPage }) {
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className='pagino'>
      <button className="first-page button-29" onClick={() => paginate(1)} disabled={currentPage === 1}>
        First
      </button>
      <button className="previous-page button-29" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button  className="button-29" key={index + 1} onClick={() => paginate(index + 1)}>
          {index + 1}
        </button>
      ))}
      <button className="next-page button-29" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
      <button className="last-page button-29" onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
        Last
      </button>
    </div>
  );
}

export default Pagination;

import React from 'react';

function Pagination({ currentPage, paginate, filteredUsers, usersPerPage }) {
  // Calculate total pages based on the number of filtered users and users per page
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className='pagino'>
      {/* Button for the first page */}
      <button className="first-page button-29" onClick={() => paginate(1)} disabled={currentPage === 1}>
        First
      </button>

      {/* Button for the previous page */}
      <button className="previous-page button-29" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>

      {/* Display buttons for each page */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button className="button-29" key={index + 1} onClick={() => paginate(index + 1)}>
          {index + 1}
        </button>
      ))}

      {/* Button for the next page */}
      <button className="next-page button-29" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>

      {/* Button for the last page */}
      <button className="last-page button-29" onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
        Last
      </button>
    </div>
  );
}

export default Pagination;

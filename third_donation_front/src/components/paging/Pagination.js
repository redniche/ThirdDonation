// import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, prevPaginate, nextPaginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-center pagination">
      <ul className="pagination">
        <li onClick={prevPaginate} className="page-link">
          &laquo;
        </li>
        {pageNumbers.map((number) => (
          <li key={number} onClick={() => paginate(number)} className="page-item page-link">
            {number}
          </li>
        ))}
        <li onClick={nextPaginate} className="page-link">
          &raquo;
        </li>
      </ul>
    </div>
  );
};
export default Pagination;

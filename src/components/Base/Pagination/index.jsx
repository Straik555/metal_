import React from 'react';
import ReactPaginate from 'react-paginate';
import { nextArrow, previousArrow } from './PaginationArrows';

const Pagination = ({ pageCount, forcePage, onPageChange }) => {
  const handlePage = ({ selected }) => onPageChange(selected + 1);
  return (
    <div className="pagination-box">
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        containerClassName="pagination"
        nextLabel={nextArrow}
        previousLabel={previousArrow}
        activeClassName="active"
        forcePage={forcePage}
        onPageChange={handlePage}
      />
    </div>
  );
};

export default Pagination;

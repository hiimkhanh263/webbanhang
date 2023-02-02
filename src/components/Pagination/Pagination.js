import React from "react";

function Pagination({ pagination, onPageChange }) {
  // const { page, pageSize, total } = pagination;

  // const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div>
      {/* <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>
        Prev
      </button>

      <button
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button> */}
    </div>
  );
}

export default Pagination;

import React from "react";

const PaginationButton = ({ handlePagination }) => {
  return (
    <button className="next-page" onClick={handlePagination}>
      Next chart
    </button>
  );
};
export default PaginationButton;

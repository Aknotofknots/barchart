import React from "react";

const PaginationButton = ({ clicked, handlePagination }) => {
  return (
    <button className="next-page" onClick={handlePagination}>
      {clicked ? "Previous chart" : "Next chart"}
    </button>
  );
};
export default PaginationButton;

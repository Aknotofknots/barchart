import React from "react";

const ErrorViewButton = ({ addShoeSizesAsync }) => {
  return (
    <button className="reload-page" onClick={addShoeSizesAsync}>
      Reload chart
    </button>
  );
};

export default ErrorViewButton;

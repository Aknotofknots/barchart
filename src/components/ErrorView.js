import React from "react";
import ErrorViewButton from "./ErrorViewButton";

const ErrorView = ({ addShoeSizesAsync }) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontFamily: "Lato, sans-serif",
          fontWeight: "300"
        }}
      >
        An error occurred when loading the chart
      </h1>,
      <ErrorViewButton addShoeSizesAsync={addShoeSizesAsync} />
    </section>
  );
};

export default ErrorView;

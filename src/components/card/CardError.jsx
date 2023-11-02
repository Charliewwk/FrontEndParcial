import React from "react";
import "./cardError.css";

const CardError = ({ error }) => {
  return (
    <div className="cardError">
      <h5>Error</h5>
      <p>Descripción: {error}</p>
    </div>
  );
};

export default CardError;

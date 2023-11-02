import React from "react";
import "./cardOk.css";

const CardOk = ({ partNumber, description }) => {
  return (
    <div className="cardOk">
      <h6>Número de parte:</h6>
      <h4>{partNumber}</h4>
      <p>Descripción:</p>
      <p>{description}</p>
    </div>
  );
};

export default CardOk;

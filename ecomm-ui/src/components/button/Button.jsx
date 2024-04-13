/* eslint-disable react/prop-types */
import React from "react";

function Button({ title, onClick, randomNum }) {
  // props -> Properties
  return <button onClick={() => onClick(randomNum)}>{title}</button>;
}

export default Button;

import React from "react";

export default function Form() {
  const fieldInputs = [
    "Loan Amount",
    "Loan Interest %",
    "Loan Duration",
    "Property Tax",
    "Property Insurance"
  ].map(function(fieldName) {
    return <p>{fieldName}</p>;
  });
  return <div>{fieldInputs}</div>;
}

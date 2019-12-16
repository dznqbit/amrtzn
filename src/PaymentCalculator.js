import React from "react";
import "./PaymentCalculator.scss";

export default function PaymentCalculator(props) {
  return (
    <div className="PaymentCalculator">
      <p>
        Loan Interest {props.loanDetails.loanInterest}
        ... TODO
      </p>
    </div>
  );
}

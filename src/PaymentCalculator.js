import React from "react";
import "./PaymentCalculator.scss";

function calculateMonthlyPayments(loanDetails) {
  // https://en.wikipedia.org/wiki/Amortization_calculator
  const p = loanDetails.loanAmount,
    i = loanDetails.loanInterest / 100.0,
    d = loanDetails.loanDuration,
    n = 12 * d;

  const paymentAmount =
    (p * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1);

  return [...Array(n)].reduce(
    (acc, _) => {
      const mrp = acc[acc.length - 1];

      return acc.concat([
        {
          p: paymentAmount,
          mp: mrp.mp - paymentAmount
        }
      ]);
    },
    [{ p: paymentAmount, mp: loanDetails.loanAmount }]
  );
}

export default function PaymentCalculator(props) {
  const loanDetails = props.loanDetails;
  const monthlyPayments = calculateMonthlyPayments(loanDetails);
  console.log(monthlyPayments);

  const monthlyPaymentHtml = monthlyPayments.map((mp, i) => (
    <tr key={i}>
      <td>{i}</td>
      <td>{mp.mp}</td>
      <td>{mp.p}</td>
    </tr>
  ));

  return (
    <div className="PaymentCalculator">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Total Payment</th>
          </tr>
        </thead>

        <tbody>{monthlyPaymentHtml}</tbody>
      </table>
    </div>
  );
}

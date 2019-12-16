import React from "react";
import NumberFormat from "react-number-format";

import "./PaymentCalculator.scss";

function calculateMonthlyPayments(loanDetails) {
  const p = loanDetails.loanAmount,
    d = loanDetails.loanDuration,
    n = 12 * d,
    nominalInterestRate = loanDetails.loanInterest / 100.0,
    monthlyInterestRate = nominalInterestRate / 12.0,
    monthlyPropertyTax = loanDetails.propertyTax / 12.0,
    monthlyPropertyInsurance = loanDetails.propertyInsurance / 12.0;

  // https://en.wikipedia.org/wiki/Fixed-rate_mortgage
  const paymentAmount =
    (p * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -n)) +
    (monthlyPropertyTax + monthlyPropertyInsurance);

  return [...Array(n)].reduce(
    (acc, _) => {
      const mrp = acc[acc.length - 1],
        previousPrincipal = mrp.principal,
        interestDue = previousPrincipal * monthlyInterestRate,
        appliedToInterest = interestDue,
        appliedToPropertyTax = monthlyPropertyTax,
        appliedToPropertyInsurance = monthlyPropertyInsurance,
        appliedToPrincipal =
          paymentAmount -
          (appliedToInterest +
            appliedToPropertyTax +
            appliedToPropertyInsurance);
      return acc.concat([
        {
          amount: paymentAmount,
          principal: mrp.principal - appliedToPrincipal,
          appliedToInterest: appliedToInterest,
          appliedToPrincipal: appliedToPrincipal,
          appliedToPropertyTax: appliedToPropertyTax,
          appliedToPropertyInsurance: appliedToPropertyInsurance
        }
      ]);
    },
    [{ amount: 0.0, principal: loanDetails.loanAmount }]
  );
}

export default function PaymentCalculator(props) {
  const loanDetails = props.loanDetails;
  const monthlyPayments = calculateMonthlyPayments(loanDetails);

  const monthlyPaymentHtml = monthlyPayments
    .map(mp => mp)
    .map((mp, i) => (
      <tr className="PaymentCalculator__row" key={i}>
        <td className="PaymentCalculator__cell">{i}</td>
        <td className="PaymentCalculator__number">
          <NumberFormat
            value={mp.principal}
            displayType="text"
            prefix="$"
            decimalScale="2"
          />
        </td>
        <td className="PaymentCalculator__number">
          <NumberFormat
            value={mp.amount}
            displayType="text"
            prefix="$"
            decimalScale="2"
          />
        </td>
        <td className="PaymentCalculator__number">
          <NumberFormat
            value={mp.appliedToPrincipal}
            displayType="text"
            prefix="$"
            decimalScale="2"
          />
        </td>
        <td className="PaymentCalculator__number">
          <NumberFormat
            value={mp.appliedToInterest}
            displayType="text"
            prefix="$"
            decimalScale="2"
          />
        </td>
        <td className="PaymentCalculator__number">
          <NumberFormat
            value={mp.appliedToPropertyTax}
            displayType="text"
            prefix="$"
            decimalScale="2"
          />
        </td>
        <td className="PaymentCalculator__number">
          <NumberFormat
            value={mp.appliedToPropertyInsurance}
            displayType="text"
            prefix="$"
            decimalScale="2"
          />
        </td>
      </tr>
    ));

  return (
    <div className="PaymentCalculator">
      <table className="PaymentCalculator__table">
        <thead>
          <tr>
            <th className="PaymentCalculator__cell">Id</th>
            <th className="PaymentCalculator__cell">Principal</th>
            <th className="PaymentCalculator__cell">Total Payment</th>
            <th className="PaymentCalculator__cell">To Principal</th>
            <th className="PaymentCalculator__cell">To Interest</th>
            <th className="PaymentCalculator__cell">To Property Tax</th>
            <th className="PaymentCalculator__cell">To Property Insurance</th>
          </tr>
        </thead>

        <tbody>{monthlyPaymentHtml}</tbody>
      </table>
    </div>
  );
}

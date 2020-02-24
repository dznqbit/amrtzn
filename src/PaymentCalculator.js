import React from "react";
import NumberFormat from "react-number-format";

import "./PaymentCalculator.scss";

export default function PaymentCalculator(props) {
  const loanDetails = props.loanDetails;
  const monthlyPaymentHtml = loanDetails.payments
    .map(mp => mp)
    .map((mp, i) => (
      <tr className="PaymentCalculator__row" key={i}>
        <td className="PaymentCalculator__cell">{mp.id}</td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--date">
          {mp.formattedDate}
        </td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--number">
          <NumberFormat
            value={mp.principal}
            displayType="text"
            prefix="$"
            decimalScale="2"
          />
        </td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--number">
          <NumberFormat
            value={mp.amount}
            displayType="text"
            prefix="$"
            decimalScale="2"
            thousandSeparator={true}
          />
        </td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--number">
          <NumberFormat
            value={mp.appliedToPrincipal}
            displayType="text"
            prefix="$"
            decimalScale="2"
            thousandSeparator={true}
          />
        </td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--number">
          <NumberFormat
            value={mp.appliedToInterest}
            displayType="text"
            prefix="$"
            decimalScale="2"
            thousandSeparator={true}
          />
        </td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--number">
          <NumberFormat
            value={mp.appliedToPropertyTax}
            displayType="text"
            prefix="$"
            decimalScale="2"
            thousandSeparator={true}
          />
        </td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--number">
          <NumberFormat
            value={mp.appliedToPropertyInsurance}
            displayType="text"
            prefix="$"
            decimalScale="2"
            thousandSeparator={true}
          />
        </td>
      </tr>
    ));

  return (
    <div className="PaymentCalculator">
      <table
        className="PaymentCalculator__table"
        cellSpacing="0"
        cellPadding="0"
      >
        <thead>
          <tr>
            <th className="PaymentCalculator__cell">Id</th>
            <th className="PaymentCalculator__cell PaymentCalculator__cell--date">
              Date
            </th>
            <th className="PaymentCalculator__cell PaymentCalculator__cell--number">
              Principal
            </th>
            <th className="PaymentCalculator__cell PaymentCalculator__cell--number">
              Total Payment
            </th>
            <th className="PaymentCalculator__cell PaymentCalculator__cell--number">
              To Principal
            </th>
            <th className="PaymentCalculator__cell PaymentCalculator__cell--number">
              To Interest
            </th>
            <th className="PaymentCalculator__cell PaymentCalculator__cell--number">
              To Property Tax
            </th>
            <th className="PaymentCalculator__cell PaymentCalculator__cell--number">
              To Property Insurance
            </th>
          </tr>
        </thead>

        <tbody>{monthlyPaymentHtml}</tbody>
      </table>
    </div>
  );
}

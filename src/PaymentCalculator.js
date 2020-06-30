import React from "react";
import NumberFormat from "react-number-format";

import "./PaymentCalculator.scss";

export default function PaymentCalculator(props) {
  const loanDetails = props.loanDetails;

  const paymentRowKeyDown = (monthlyPayment, evt) => {
    const key = evt.key;
    const newPaymentAmount = evt.target.value;

    switch (key) {
      case "Enter":
        monthlyPayment.payment.amount = Number(
          newPaymentAmount.replace(/[^0-9-]/g, "")
        );
        break;
      case "Escape":
        break;
      default:
        return;
    }

    props.updateMonthlyPayment(monthlyPayment);
  };

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
            value={mp.payment.principal}
            displayType="text"
            prefix="$"
            decimalScale="2"
          />
        </td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--number">
          <NumberFormat
            className="PaymentCalculator__input"
            value={mp.payment.amount}
            onKeyDown={e => paymentRowKeyDown(mp, e)}
            prefix="$"
            decimalScale="2"
            thousandSeparator={true}
            decimalSeparator="."
            allowNegative={false}
            onFocus={e => e.target.select()}
          />
        </td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--number">
          <NumberFormat
            value={mp.payment.appliedToPrincipal}
            displayType="text"
            prefix="$"
            decimalScale="2"
            thousandSeparator={true}
          />
        </td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--number">
          <NumberFormat
            value={mp.payment.appliedToInterest}
            displayType="text"
            prefix="$"
            decimalScale="2"
            thousandSeparator={true}
          />
        </td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--number">
          <NumberFormat
            value={mp.interestSaved}
            displayType="text"
            prefix="$"
            decimalScale="2"
            thousandSeparator={true}
          />
        </td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--number">
          <NumberFormat
            value={mp.totalInterestSaved}
            displayType="text"
            prefix="$"
            decimalScale="2"
            thousandSeparator={true}
          />
        </td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--number">
          <NumberFormat
            value={mp.payment.appliedToPropertyTax}
            displayType="text"
            prefix="$"
            decimalScale="2"
            thousandSeparator={true}
          />
        </td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--number">
          <NumberFormat
            value={mp.payment.appliedToPropertyInsurance}
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
              Interest Saved
            </th>
            <th className="PaymentCalculator__cell PaymentCalculator__cell--number">
              Total Interest Saved
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

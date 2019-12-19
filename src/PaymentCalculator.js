import React from "react";
import NumberFormat from "react-number-format";

import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import minimumMonthlyPayment from "./amrtzn/minimumMonthlyPayment";

import "./PaymentCalculator.scss";

function formatDate(date) {
  return format(date, "yyyy MMM");
}

function calculateMonthlyPayments(loanDetails) {
  const n = 12 * loanDetails.loanDuration,
    nominalInterestRate = loanDetails.loanInterest / 100.0,
    monthlyInterestRate = nominalInterestRate / 12.0,
    monthlyPropertyTax = loanDetails.propertyTax / 12.0,
    monthlyPropertyInsurance = loanDetails.propertyInsurance / 12.0,
    monthlyOverpay = loanDetails.monthlyOverpay;

  let paymentRequired = minimumMonthlyPayment(loanDetails);

  let payments = [...Array(n).keys()].reduce(
    (acc, i) => {
      const mrp = acc[acc.length - 1],
        date = addMonths(loanDetails.loanStart, i),
        previousPrincipal = mrp.principal,
        interestDue = previousPrincipal * monthlyInterestRate,
        appliedToInterest = interestDue,
        appliedToPropertyTax = monthlyPropertyTax,
        appliedToPropertyInsurance = monthlyPropertyInsurance;
      const appliedToPrincipal = Math.min(
        mrp.principal,
        paymentRequired +
          monthlyOverpay -
          (appliedToInterest +
            appliedToPropertyTax +
            appliedToPropertyInsurance)
      );

      const amountPaid =
        appliedToPrincipal +
        appliedToInterest +
        appliedToPropertyTax +
        appliedToPropertyInsurance;

      return acc.concat([
        {
          id: 1 + mrp.id || 1,
          date: formatDate(date),
          amount: amountPaid,
          principal: mrp.principal - appliedToPrincipal,
          appliedToInterest: appliedToInterest,
          appliedToPrincipal: appliedToPrincipal,
          appliedToPropertyTax: appliedToPropertyTax,
          appliedToPropertyInsurance: appliedToPropertyInsurance
        }
      ]);
    },
    [
      {
        date: formatDate(loanDetails.loanStart),
        amount: 0.0,
        principal: loanDetails.loanAmount
      }
    ]
  );

  payments.shift();
  return payments;
}

export default function PaymentCalculator(props) {
  const loanDetails = props.loanDetails;
  const monthlyPayments = calculateMonthlyPayments(loanDetails);

  const monthlyPaymentHtml = monthlyPayments
    .map(mp => mp)
    .map((mp, i) => (
      <tr className="PaymentCalculator__row" key={i}>
        <td className="PaymentCalculator__cell">{mp.id}</td>
        <td className="PaymentCalculator__cell PaymentCalculator__cell--date">
          {mp.date}
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

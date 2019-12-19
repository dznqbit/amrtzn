import React, { useState } from "react";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";

import minimumMonthlyPayment from "./amrtzn/minimumMonthlyPayment";

import "./Form.scss";
import "react-datepicker/dist/react-datepicker.css";

export default function Form(props) {
  const loanDetails = props.loanDetails;
  const [loanStart, setLoanStart] = useState(loanDetails.loanStart);
  const [loanAmount, setLoanAmount] = useState(loanDetails.loanAmount);
  const [loanInterest, setLoanInterest] = useState(loanDetails.loanInterest);
  const [loanDuration, setLoanDuration] = useState(loanDetails.loanDuration);
  const [monthlyOverpay, setMonthlyOverpay] = useState(
    loanDetails.monthlyOverpay
  );
  const [propertyTax, setPropertyTax] = useState(loanDetails.propertyTax);
  const [propertyInsurance, setPropertyInsurance] = useState(
    loanDetails.propertyInsurance
  );

  const minimumPayment = minimumMonthlyPayment(loanDetails);

  function keyDown(e) {
    const { key } = e;

    if (key == "Enter") {
      handleSubmit();
    }
  }

  function handleSubmit(evt) {
    if (evt) {
      evt.preventDefault();
    }

    const loanDetails = {
      loanStart: loanStart,
      loanAmount: loanAmount,
      loanInterest: loanInterest,
      loanDuration: loanDuration,
      monthlyOverpay: Number(monthlyOverpay),
      propertyTax: propertyTax,
      propertyInsurance: propertyInsurance
    };

    console.log(loanDetails);
    props.update(loanDetails);
  }

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <div className="Form__section Form__section--loanDetails">
        <fieldset className="Form__fieldset">
          <label className="Form__field">
            <span className="Form__label">Start</span>
            <DatePicker selected={loanStart} onChange={setLoanStart} />
          </label>

          <label className="Form__field">
            <span className="Form__label">Amount</span>
            <NumberFormat
              value={loanAmount}
              onValueChange={v => setLoanAmount(v.value)}
              prefix="$ "
              suffix="  "
              decimalScale="2"
              decimalSeparator="."
              thousandSeparator={true}
              allowNegative={false}
              className="Form__input Form__input--numeric"
            />
          </label>

          <label className="Form__field">
            <span className="Form__label">Interest</span>
            <NumberFormat
              value={loanInterest}
              onValueChange={v => setLoanInterest(v.value)}
              suffix=" %"
              decimalScale="3"
              allowNegative={false}
              className="Form__input Form__input--numeric"
            />
          </label>

          <label className="Form__field">
            <span className="Form__label">Duration</span>
            <NumberFormat
              value={loanDuration}
              onValueChange={v => setLoanDuration(v.value)}
              suffix=" Y"
              allowNegative={false}
              className="Form__input Form__input--numeric"
            />
          </label>

          <label className="Form__field">
            <span className="Form__label">Annual Property Tax</span>
            <NumberFormat
              value={propertyTax}
              onValueChange={v => setPropertyTax(v.value)}
              prefix="$ "
              suffix="  "
              decimalScale="2"
              decimalSeparator="."
              thousandSeparator={true}
              allowNegative={false}
              className="Form__input Form__input--numeric"
            />
          </label>

          <label className="Form__field">
            <span className="Form__label">Annual Property Insurance</span>
            <NumberFormat
              value={propertyInsurance}
              onValueChange={v => setPropertyInsurance(v.value)}
              prefix="$ "
              suffix="  "
              decimalScale="2"
              decimalSeparator="."
              thousandSeparator={true}
              allowNegative={false}
              className="Form__input Form__input--numeric"
            />
          </label>
        </fieldset>
      </div>
      <div className="Form__section Form__section--payment">
        <fieldset className="Form__fieldset">
          <label className="Form__field">
            <span className="Form__label">Minimum Payment</span>
            <NumberFormat
              value={minimumPayment}
              prefix="$ "
              suffix="  "
              decimalScale="2"
              decimalSeparator="."
              thousandSeparator={true}
              allowNegative={false}
              disabled={true}
              className="Form__input Form__input--numeric"
            />
          </label>

          <label className="Form__field">
            <span className="Form__label">Addt'l Payment</span>
            <NumberFormat
              value={monthlyOverpay}
              onValueChange={v => setMonthlyOverpay(v.value)}
              onKeyDown={keyDown}
              prefix="$ "
              suffix="  "
              decimalScale="2"
              decimalSeparator="."
              thousandSeparator={true}
              allowNegative={false}
              className="Form__input Form__input--numeric"
            />
          </label>
        </fieldset>

        <input
          className="Form__input Form__input--submit"
          type="submit"
          value="Calculate"
        />
      </div>
    </form>
  );
}

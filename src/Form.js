import React, { useState } from "react";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";

import "./Form.scss";
import "react-datepicker/dist/react-datepicker.css";

export default function Form(props) {
  const loanDetails = props.loanDetails;
  const [loanStart, setLoanStart] = useState(loanDetails.loanStart);
  const [loanAmount, setLoanAmount] = useState(loanDetails.loanAmount);
  const [loanInterest, setLoanInterest] = useState(loanDetails.loanInterest);
  const [loanDuration, setLoanDuration] = useState(loanDetails.loanDuration);
  const [propertyTax, setPropertyTax] = useState(loanDetails.propertyTax);
  const [propertyInsurance, setPropertyInsurance] = useState(
    loanDetails.propertyInsurance
  );

  function handleSubmit(evt) {
    evt.preventDefault();

    props.update({
      loanStart: loanStart,
      loanAmount: loanAmount,
      loanInterest: loanInterest,
      loanDuration: loanDuration,
      propertyTax: propertyTax,
      propertyInsurance: propertyInsurance
    });
  }

  return (
    <form className="Form" onSubmit={handleSubmit}>
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

      <input
        className="Form__input Form__input--submit"
        type="submit"
        value="Calculate"
      />
    </form>
  );
}

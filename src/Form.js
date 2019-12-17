import React, { useState } from "react";
import NumberFormat from "react-number-format";
import "./Form.scss";

export default function Form(props) {
  const loanDetails = props.loanDetails;
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
          <span className="Form__label">Amount</span>
          <NumberFormat
            value={loanAmount}
            onChange={e => setLoanAmount(e.target.value)}
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
            onChange={e => setLoanInterest(e.target.value)}
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
            onChange={e => setLoanDuration(e.target.value)}
            suffix=" Y"
            allowNegative={false}
            className="Form__input Form__input--numeric"
          />
        </label>

        <label className="Form__field">
          <span className="Form__label">Annual Property Tax</span>
          <NumberFormat
            value={propertyTax}
            onChange={e => setPropertyTax(e.target.value)}
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
            onChange={e => setPropertyInsurance(e.target.value)}
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

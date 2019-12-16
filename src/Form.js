import React, { useState } from "react";
import "./Form.scss";

export default function Form() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanInterest, setLoanInterest] = useState(4.0);
  const [loanDuration, setLoanDuration] = useState(30);
  const [propertyTax, setPropertyTax] = useState(3600);
  const [propertyInsurance, setPropertyInsurance] = useState(3600);

  function handleSubmit() {
    console.log("oh boy");
  }

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <fieldset className="Form__fieldset">
        <label className="Form__field">
          <span className="Form__label">Amount</span>
          <input
            type="number"
            min="0"
            className="Form__input Form__input--numeric"
            value={loanAmount}
            onChange={e => setLoanAmount(e.target.value)}
          />
        </label>

        <label className="Form__field">
          <span className="Form__label">Interest</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.001"
            className="Form__input Form__input--numeric"
            value={loanInterest}
            onChange={e => setLoanInterest(e.target.value)}
          />
        </label>

        <label className="Form__field">
          <span className="Form__label">Duration</span>
          <input
            type="number"
            min="0"
            max="1024"
            className="Form__input Form__input--numeric"
            value={loanDuration}
            onChange={e => setLoanDuration(e.target.value)}
          />
        </label>

        <label className="Form__field">
          <span className="Form__label">Annual Property Tax</span>
          <input
            type="number"
            min="0"
            className="Form__input Form__input--numeric"
            value={propertyTax}
            onChange={e => setPropertyTax(e.target.value)}
          />
        </label>

        <label className="Form__field">
          <span className="Form__label">Annual Property Insurance</span>
          <input
            type="number"
            min="0"
            className="Form__input Form__input--numeric"
            value={propertyInsurance}
            onChange={e => setPropertyInsurance(e.target.value)}
          />
        </label>
      </fieldset>

      <input className="Form__input Form__input--submit" type="submit" />
    </form>
  );
}

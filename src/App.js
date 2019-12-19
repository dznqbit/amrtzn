import React, { useState } from "react";
import Form from "./Form";
import PaymentCalculator from "./PaymentCalculator";
import "./App.scss";

function parseLoanDetails(loanDetailsString) {
  if (!loanDetailsString) {
    return null;
  }

  let loanDetails = JSON.parse(loanDetailsString);
  loanDetails.loanStart = new Date(loanDetails.loanStart);

  return loanDetails;
}

const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
  let serializedLocalValue = localStorage.getItem(localStorageKey);
  let localValue = parseLoanDetails(serializedLocalValue);

  const [value, setValue] = useState(localValue || defaultValue);
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [localStorageKey, value]);
  return [value, setValue];
};

const App = () => {
  const [loanDetails, setLoanDetails] = useStateWithLocalStorage(
    "loanDetails",
    {
      loanStart: new Date(),
      loanAmount: 300000,
      loanInterest: 4.0,
      loanDuration: 30,
      propertyTax: 500,
      propertyInsurance: 1200
    }
  );

  return (
    <div className="App">
      <header className="App__header">
        <h1>amrtzn</h1>
      </header>
      <main>
        <Form loanDetails={loanDetails} update={setLoanDetails} />
        <PaymentCalculator loanDetails={loanDetails} />
      </main>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Changelog from "./Changelog";
import Form from "./Form";
import PaymentCalculator from "./PaymentCalculator";
import "./App.scss";

function parseLoanDetails(loanDetailsString) {
  if (!loanDetailsString) {
    return null;
  }

  let loanDetails = JSON.parse(loanDetailsString);
  loanDetails.loanStart = new Date(loanDetails.loanStart);

  if (isNaN(loanDetails.loanStart)) {
    loanDetails.loanStart = new Date();
  }

  loanDetails.loanInterest = Number(loanDetails.loanInterest);
  loanDetails.monthlyOverpay = Number(loanDetails.monthlyOverpay);

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
      monthlyOverpay: 0,
      propertyTax: 500,
      propertyInsurance: 1200
    }
  );

  return (
    <div className="App">
      <header className="App__header">
        <h1>
          <a href="/" title="AMRTZN">
            amrtzn.co
          </a>
        </h1>
      </header>
      <main>
        <Router>
          <Route path="/changelog" component={Changelog} />
          <Route exact path="/">
            <Form loanDetails={loanDetails} update={setLoanDetails} />
            <PaymentCalculator loanDetails={loanDetails} />
          </Route>
        </Router>
      </main>
    </div>
  );
};

export default App;

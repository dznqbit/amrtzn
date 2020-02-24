import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { calculateMonthlyPayments } from "./amrtzn/calculator";

import Changelog from "./Changelog";
import { encodeLoanJson, decodeLoanJson } from "./amrtzn/json";
import Form from "./Form";
import PaymentCalculator from "./PaymentCalculator";
import "./App.scss";

const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
  let serializedLocalValue = localStorage.getItem(localStorageKey);
  let localValue = decodeLoanJson(serializedLocalValue);

  if (isNaN(localValue.loanStart)) {
    localValue.loanStart = new Date();
  }

  if (!localValue.payments) {
    localValue.payments = [];
  }

  const [value, setValue] = useState(localValue || defaultValue);
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, encodeLoanJson(value));
  }, [localStorageKey, value]);
  return [value, setValue];
};

const App = () => {
  let defaultLoanDetails = {
    loanStart: new Date(),
    loanAmount: 300000,
    loanInterest: 4.0,
    loanDuration: 30,
    minimumPayment: 0,
    paymentAmount: 0,
    payments: [],
    propertyTax: 500,
    propertyInsurance: 1200
  };

  defaultLoanDetails.payments = calculateMonthlyPayments(defaultLoanDetails);
  const [loanDetails, setLoanDetails] = useStateWithLocalStorage(
    "loanDetails",
    defaultLoanDetails
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

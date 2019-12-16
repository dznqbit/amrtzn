import React, { useState } from "react";
import Form from "./Form";
import PaymentCalculator from "./PaymentCalculator";
import "./App.scss";

function App() {
  const [loanDetails, setLoanDetails] = useState({
    loanAmount: 100000,
    loanInterest: 4.0,
    loanDuration: 30,
    propertyTax: 3600,
    propertyInsurance: 3600
  });

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
}

export default App;

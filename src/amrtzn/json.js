function encodeLoanJson(loan) {
  return JSON.stringify(loan);
}

function decodeLoanJson(json) {
  try {
    if (!json) {
      return null;
    }

    let loanDetails = JSON.parse(json);

    loanDetails.loanAmount = Number(loanDetails.loanAmount);
    loanDetails.loanStart = new Date(loanDetails.loanStart);
    loanDetails.loanInterest = Number(loanDetails.loanInterest);
    loanDetails.minimumPayment = Number(loanDetails.minimumPayment);
    loanDetails.paymentAmount = Number(loanDetails.paymentAmount);

    loanDetails.payments = loanDetails.payments.map(function(mp) {
      mp.date = new Date(mp.date);
      return mp;
    });

    return loanDetails;
  } catch (exception) {
    console.error("Could not deserialize loan JSON", exception.message);
  }
}

export { encodeLoanJson, decodeLoanJson };

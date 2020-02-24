function encodeLoanJson(loan) {
  return JSON.stringify(loan);
}

function decodeLoanJson(json) {
  if (!json) {
    return null;
  }

  let loanDetails = JSON.parse(json);

  loanDetails.loanAmount = Number(loanDetails.loanAmount);
  loanDetails.loanStart = new Date(loanDetails.loanStart);
  loanDetails.loanInterest = Number(loanDetails.loanInterest);
  loanDetails.minimumPayment = Number(loanDetails.minimumPayment);
  loanDetails.paymentAmount = Number(loanDetails.paymentAmount);

  return loanDetails;
}

export { encodeLoanJson, decodeLoanJson };

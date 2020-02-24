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
  loanDetails.monthlyOverpay = Number(loanDetails.monthlyOverpay);

  return loanDetails;
}

export { encodeLoanJson, decodeLoanJson };

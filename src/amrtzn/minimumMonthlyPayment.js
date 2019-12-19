export default function minimumMonthlyPayment(loanDetails) {
  const p = loanDetails.loanAmount,
    n = 12 * loanDetails.loanDuration,
    nominalInterestRate = loanDetails.loanInterest / 100.0,
    monthlyInterestRate = nominalInterestRate / 12.0,
    monthlyPropertyTax = loanDetails.propertyTax / 12.0,
    monthlyPropertyInsurance = loanDetails.propertyInsurance / 12.0;
  // https://en.wikipedia.org/wiki/Fixed-rate_mortgage
  const paymentRequired =
    (p * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -n)) +
    (monthlyPropertyTax + monthlyPropertyInsurance);

  return paymentRequired;
}

import addMonths from "date-fns/addMonths";
import format from "date-fns/format";

function formatDate(date) {
  return format(date, "yyyy MMM");
}

function minimumMonthlyPayment(loanDetails) {
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

function calculateNextPayment(loanDetails, mostRecentPurchase) {
  const nominalInterestRate = loanDetails.loanInterest / 100.0,
    monthlyInterestRate = nominalInterestRate / 12.0,
    monthlyPropertyTax = loanDetails.propertyTax / 12.0,
    monthlyPropertyInsurance = loanDetails.propertyInsurance / 12.0,
    monthlyOverpay = loanDetails.monthlyOverpay;

  let paymentRequired = minimumMonthlyPayment(loanDetails);

  const date = addMonths(mostRecentPurchase.date, 1),
    interestDue = mostRecentPurchase.principal * monthlyInterestRate,
    appliedToInterest = interestDue,
    appliedToPropertyTax = monthlyPropertyTax,
    appliedToPropertyInsurance = monthlyPropertyInsurance;

  const appliedToPrincipal = Math.min(
    mostRecentPurchase.principal,
    paymentRequired +
      monthlyOverpay -
      (appliedToInterest + appliedToPropertyTax + appliedToPropertyInsurance)
  );

  const amountPaid =
    appliedToPrincipal +
    appliedToInterest +
    appliedToPropertyTax +
    appliedToPropertyInsurance;

  return {
    id: 1 + mostRecentPurchase.id || 1,
    date: date,
    formattedDate: formatDate(date),
    amount: amountPaid,
    principal: mostRecentPurchase.principal - appliedToPrincipal,
    appliedToInterest: appliedToInterest,
    appliedToPrincipal: appliedToPrincipal,
    appliedToPropertyTax: appliedToPropertyTax,
    appliedToPropertyInsurance: appliedToPropertyInsurance
  };
}

function calculateMonthlyPayments(loanDetails) {
  const n = 12 * loanDetails.loanDuration;
  let payments = [...Array(n).keys()].reduce(
    (acc, _) => {
      let nextPayment = calculateNextPayment(loanDetails, acc[acc.length - 1]);
      return acc.concat([nextPayment]);
    },
    [
      {
        date: loanDetails.loanStart,
        amount: 0.0,
        principal: loanDetails.loanAmount
      }
    ]
  );

  payments.shift();
  return payments;
}

export { calculateMonthlyPayments, minimumMonthlyPayment };

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

// Return a payment object:
// { amount, principal, appliedToInterest, appliedToPrincipal,
//    appliedToPropertyTax, appliedToPropertyInsurance }
function calculatePayment(amountPaid, loanDetails, remainingPrincipal) {
  const nominalInterestRate = loanDetails.loanInterest / 100.0,
    monthlyInterestRate = nominalInterestRate / 12.0,
    monthlyPropertyTax = loanDetails.propertyTax / 12.0,
    monthlyPropertyInsurance = loanDetails.propertyInsurance / 12.0,
    interestDue = remainingPrincipal * monthlyInterestRate,
    appliedToInterest = interestDue,
    appliedToPropertyTax = monthlyPropertyTax,
    appliedToPropertyInsurance = monthlyPropertyInsurance,
    appliedToPrincipal = Math.min(
      remainingPrincipal,
      amountPaid -
        (appliedToInterest + appliedToPropertyTax + appliedToPropertyInsurance)
    );

  return {
    amount: amountPaid,
    principal: remainingPrincipal - appliedToPrincipal,
    appliedToInterest: appliedToInterest,
    appliedToPrincipal: appliedToPrincipal,
    appliedToPropertyTax: appliedToPropertyTax,
    appliedToPropertyInsurance: appliedToPropertyInsurance
  };
}

// Returns a month object:
// { id, date, nominalPayment, payment }
// payment is the actual payment made,
// nominalPayment is the bank-proscribed minimum payment
function calculateNextPayment(loanDetails, previousPayment) {
  const date = addMonths(previousPayment.date, 1),
    monthlyInterestRate = loanDetails.loanInterest / 1200.0;

  let minimumPaymentRequired = minimumMonthlyPayment(loanDetails);
  let payment = calculatePayment(
    minimumPaymentRequired + loanDetails.monthlyOverpay,
    loanDetails,
    previousPayment.payment.principal
  );

  let nominalPayment = calculatePayment(
    minimumPaymentRequired,
    loanDetails,
    previousPayment.nominalPayment.principal
  );

  let interestSaved =
    (nominalPayment.principal - payment.principal) * monthlyInterestRate;

  return {
    id: 1 + previousPayment.id || 1,
    date: date,
    formattedDate: formatDate(date),
    payment: payment,
    nominalPayment: nominalPayment,
    interestSaved: interestSaved,
    totalInterestSaved: interestSaved + previousPayment.totalInterestSaved
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
        formattedDate: formatDate(loanDetails.loanStart),
        interestSaved: 0,
        totalInterestSaved: 0,
        payment: { amount: 0.0, principal: loanDetails.loanAmount },
        nominalPayment: { amount: 0.0, principal: loanDetails.loanAmount }
      }
    ]
  );

  payments.shift();
  return payments;
}

export { calculateMonthlyPayments, minimumMonthlyPayment };

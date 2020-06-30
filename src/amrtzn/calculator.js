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
function calculatePayment(paymentAmount, loanDetails, remainingPrincipal) {
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
      paymentAmount -
        (appliedToInterest + appliedToPropertyTax + appliedToPropertyInsurance)
    );

  return {
    amount: paymentAmount,
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

  let payment = calculatePayment(
    loanDetails.paymentAmount,
    loanDetails,
    previousPayment.payment.principal
  );

  let nominalPayment = calculatePayment(
    loanDetails.minimumPaymentAmount,
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

// Replace a monthlyPayment and recalculate following payments
// Returns a new monthlyPayments array
function updateMonthlyPayment(loanDetails, updatedMonthlyPayment) {
  const n = 12 * loanDetails.loanDuration;
  const i = loanDetails.payments.findIndex(
    mp => mp.id === updatedMonthlyPayment.id
  );

  if (i < 0) {
    return loanDetails;
  }

  // Set up a new monthlyPayments array
  let newMonthlyPayments = loanDetails.payments.slice(0, i);
  const priorRemainingPrincipal = (() => {
    if (newMonthlyPayments.length === 0) {
      return loanDetails.loanAmount;
    } else {
      return newMonthlyPayments[newMonthlyPayments.length - 1].payment
        .principal;
    }
  })();

  let replacementMonthlyPayment = calculatePayment(
    updatedMonthlyPayment.payment.amount,
    loanDetails,
    priorRemainingPrincipal
  );

  updatedMonthlyPayment.payment = replacementMonthlyPayment;

  newMonthlyPayments.push(updatedMonthlyPayment);

  while (newMonthlyPayments.length < n) {
    newMonthlyPayments.push(
      calculateNextPayment(
        loanDetails,
        newMonthlyPayments[newMonthlyPayments.length - 1]
      )
    );
  }

  return newMonthlyPayments;
}

export {
  calculateMonthlyPayments,
  minimumMonthlyPayment,
  updateMonthlyPayment
};

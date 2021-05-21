const config = require("../config/config");

const validator = (loan) => {
  var { contactNumber, email, loanAmount, startDate, endDate, emi } = loan;
  if (!config.rxphone.test(contactNumber) || !config.rxemail.test(email)) return false;
  if (loanAmount < 10000) return false;
  const today = new Date();
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  if (startDate < today || endDate < today || endDate - startDate < 31536000000) return false;
  if (emi < loanAmount / 10) return false;
  return true;
};

module.exports = validator;

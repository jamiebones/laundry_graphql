const CustomerMutation = require("./customerMutation");
const IncomeMutation = require("./incomeMutation");
const ExpenseMutation = require("./expenseMutation");
const LaundryMutation = require("./laundryMutation");
const BankMoneyMutation = require("./bankMoneyMutation");

module.exports = {
  ...CustomerMutation,
  ...IncomeMutation,
  ...ExpenseMutation,
  ...LaundryMutation,
  ...BankMoneyMutation
};

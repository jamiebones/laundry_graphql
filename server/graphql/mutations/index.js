const CustomerMutation = require("./customerMutation");
const IncomeMutation = require("./incomeMutation");
const ExpenseMutation = require("./expenseMutation");
const LaundryMutation = require("./laundryMutation");
const BankMoneyMutation = require("./bankMoneyMutation");
const RegisterMutation = require("./registerMutation");
const AuthMutation = require("./authMutation");

module.exports = {
  ...CustomerMutation,
  ...IncomeMutation,
  ...ExpenseMutation,
  ...LaundryMutation,
  ...BankMoneyMutation,
  ...RegisterMutation,
  ...AuthMutation
};

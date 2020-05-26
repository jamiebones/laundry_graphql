const CustomerQueries = require("./customersQueries.js");
const LaundryQueries = require("./laundryQueries");
const IncomeQueries = require("./incomeQueries");
const ExpenseQueries = require("./expenseQueries");
const BankMoneyQueries = require("./bankMoneyQueries");
const DebtorQueries = require("./debtorQueries");
const ExpenseLaundryQueries = require("./expenseLaundryQueries");

module.exports = {
  ...CustomerQueries,
  ...LaundryQueries,
  ...IncomeQueries,
  ...ExpenseQueries,
  ...BankMoneyQueries,
  ...DebtorQueries,
  ...ExpenseLaundryQueries
};

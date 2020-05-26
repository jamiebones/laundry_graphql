const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  date: Date,
  description: String,
  amount: String
});

module.exports = mongoose.model("Expense", expenseSchema);

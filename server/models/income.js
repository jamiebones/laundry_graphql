const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  date: Date,
  customerId: String,
  amount: String
});

module.exports = mongoose.model("Income", incomeSchema);

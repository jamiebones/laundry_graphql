const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bankMoneySchema = new Schema({
  date: Date,
  amount: String
});

module.exports = mongoose.model("BankMoney", bankMoneySchema);

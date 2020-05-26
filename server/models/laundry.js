const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const laundrySchema = new Schema({
  clothes: String,
  amount: String,
  number: String,
  date: Date,
  customerId: String,
  clothesCollected: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Laundry", laundrySchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: { type: String },
  title: { type: String, required: false },
  contact: {
    type: [String],
    required: false
  },
  address: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Customer", customerSchema);

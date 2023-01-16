const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = Schema({
  from: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  against: {
    type: mongoose.Types.ObjectId,
    ref: "course",
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: "admin",
  },
  receipt: {
    type: String,
    required: true,
  },
});

module.exports = Payment = mongoose.model("payment", PaymentSchema);

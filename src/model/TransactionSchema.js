const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["deposit", "withdrawal", "debit", "credit"],
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

/* send credit */
transactionSchema.statics.sendDebitAlert = async function (
  account,
  amount,
  accountNumber,
  description
) {
  // Create a new transaction document
  const transaction = new this({
    account,
    type: "debit",
    amount,
    accountNumber,
    description,
  });

  // Save the transaction document to the database
  const result = await transaction.save();
  return result;
};

/* send debit */
transactionSchema.statics.sendCreditAlert = async function (
  account,
  amount,
  accountNumber,
  description
) {
  // Create a new transaction document
  const transaction = new this({
    account,
    type: "credit",
    amount,
    accountNumber,
    description,
  });

  // Save the transaction document to the database
  const result = await transaction.save();
  return result;
};

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;

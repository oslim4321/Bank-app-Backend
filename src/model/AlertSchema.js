const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['debit', 'credit']
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  // Other fields go here
  alerts: [alertSchema]
});

userSchema.methods.sendDebitAlert = function (amount) {
  // Save the debit alert to the database
  this.alerts.push({ type: 'debit', amount });
  this.save();
};

userSchema.methods.sendCreditAlert = function (amount) {
  // Save the credit alert to the database
  this.alerts.push({ type: 'credit', amount });
  this.save();
};

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const SendMoneytransactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description:{
      type: String,
      required:true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const SendMoney = mongoose.model('SendMoney', SendMoneytransactionSchema);
module.exports = SendMoney

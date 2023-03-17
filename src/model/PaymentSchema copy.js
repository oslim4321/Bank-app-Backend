const mongoose = require('mongoose');



const paymentSchema = new mongoose.Schema({
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true
    },
    recipient: {
      type: String,
      required: true
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
const Payment = mongoose.model('Payment', paymentSchema);


module.exports = Payment;

  